install:
	pnpm install

start:
	pnpm test && pnpm dev

test:
	pnpm test

build:
	pnpm test && pnpm build

deploy:
	pnpm test && pnpm build && pnpm run deploy