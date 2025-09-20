import { db } from "~/.server/db";
import messages from "~/.server/db/schema/messages.table";
import threads from "~/.server/db/schema/threads.table";
import pc from "picocolors";
import { cluster, draw } from "radashi";

function prepareMessages() {
  const messages = [
    "Hello",
    "How are you?",
    "I'm fine, thank you!",
    "That's great to hear!",
    "What have you been up to?",
    "Just working on a project.",
    "Sounds interesting!",
    "Yeah, it's been fun!",
    "Goodbye for now.",
    "Goodbye! Talk soon.",
  ];

  const timestamps = generateNTimestamps(messages.length);

  timestamps.sort((a, b) => a.getTime() - b.getTime());

  return messages.map((content, index) => ({
    content,
    createdAt: timestamps[index],
  }));
}

function generateNTimestamps(count: number) {
  return Array.from({ length: count }, () => generateRandomTimestampWithinLast7Days());
}

const generateRandomTimestampWithinLast7Days = (daysAgo = 7): Date => {
  const now = new Date();

  const randomDaysAgo = Math.floor(Math.random() * daysAgo); // 0 to n days ago

  const randomHours = Math.floor(Math.random() * 24); // 0 to 23 hours

  const randomMinutes = Math.floor(Math.random() * 60); // 0 to 59 minutes

  const randomSeconds = Math.floor(Math.random() * 60); // 0 to 59 seconds

  const timestamp = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - randomDaysAgo,
    now.getHours() - randomHours,
    now.getMinutes() - randomMinutes,
    now.getSeconds() - randomSeconds,
  );

  return timestamp;
};

export default async function seedChats(refresh = true) {
  if (refresh) {
    await db.delete(threads);
    // No need for ->  await db.delete(messages); because of cascade delete
  }

  const users = await db.query.users.findMany({ columns: { id: true } });

  if (!users.length) {
    console.error(pc.red("🚨 No users found to seed chats - Seed/Create a user first"));

    return;
  }

  const groups = cluster(users, 2); // Create groups of 2 users

  for (const group of groups) {
    const u1 = draw(group)!; // Pick one user

    const u2 = group.filter((i) => i.id !== u1.id)[0]; // Get the second user

    if (!u1 || !u2) continue; // Ensure they are valid

    const sampleMessages = prepareMessages();

    const startTimestamp = sampleMessages[0].createdAt;

    const [{ threadId }] = await db
      .insert(threads)
      .values({
        createdBy: u1.id,
        participantId: u2.id,
        createdAt: startTimestamp,
        updatedAt: startTimestamp,
      })
      .returning({ threadId: threads.id });

    // Alternate messages between both users
    let senderId = u1.id;

    for (const msg of sampleMessages) {
      await db.insert(messages).values({
        threadId,
        senderId,
        content: msg.content,
        createdAt: msg.createdAt,
        updatedAt: msg.createdAt,
      });

      // Switch sender for the next message
      senderId = senderId === u1.id ? u2.id : u1.id;
    }
  }

  console.log(pc.green("🌱 Chats seeded successfully!"));
}
