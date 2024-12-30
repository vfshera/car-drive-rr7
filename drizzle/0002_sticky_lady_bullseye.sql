ALTER TABLE `car_photos` ADD `created_at` integer DEFAULT (unixepoch()) NOT NULL;--> statement-breakpoint
ALTER TABLE `car_photos` ADD `updated_at` integer DEFAULT (unixepoch()) NOT NULL;