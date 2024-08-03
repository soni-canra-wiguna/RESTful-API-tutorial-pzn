# Setup Project

## create .env file

```env
DATABASE_URL="mysql://root:root@localhost:3306/learn_restful_api_with_ts"
```

## Running locally

```shell

npm install

npx prisma migrate dev

npx prisma generate

npm run build

npm run start

```
