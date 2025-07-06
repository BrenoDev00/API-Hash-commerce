BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS public.users(
	id UUID DEFAULT gen_random_uuid(),
	name VARCHAR(20) NOT NULL,
	surname VARCHAR(35) NOT NULL, 
	email VARCHAR(85) NOT NULL,
	password TEXT,
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS public.products(
	id UUID DEFAULT gen_random_uuid(),
	name VARCHAR(100) NOT NULL,
	price_in_cents INTEGER NOT NULL,
	size TEXT NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS public.purchases(
	id UUID DEFAULT gen_random_uuid(),
	purchase_date DATE NOT NULL DEFAULT CURRENT_DATE,
	delivery_address TEXT NOT NULL,
	user_id UUID NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS public.purchases_products(
	id UUID DEFAULT gen_random_uuid(),
	purchase_id UUID NOT NULL,
	product_id UUID NOT NULL,
	product_ammount INTEGER NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(purchase_id) REFERENCES purchases(id),
	FOREIGN KEY(product_id) REFERENCES products(id)
);

COMMIT; 
