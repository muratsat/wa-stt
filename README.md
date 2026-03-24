# Elysia with Bun runtime

## Getting Started

To get started with this template, simply paste this command into your terminal:

```bash
bun create elysia ./elysia-example
```

## Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

## Production

[docs](https://elysiajs.com/patterns/deploy.html#target)

build for production:

```
bun build \
	--compile \
	--minify-whitespace \
	--minify-syntax \
	--target bun-linux-x64 \
	--outfile build/server \
	src/index.ts
```
