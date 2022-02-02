<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

```bash
# show models
$ npx prisma studio

# create migration (only dev)
$ npx prisma migrate dev --name init

# create db (prod)
$ npx prisma db push
```

## Database Model

```prisma

model User {
id        String    @id @unique @default(uuid())
email     String    @unique
password  String
createdAt DateTime  @default(now())
updatedAt DateTime  @updatedAt
deletedAt DateTime?
entities  Entity[]
}

model Entity {
id           String        @id @unique @default(uuid())
name         String
description  String?
author       User          @relation(fields: [authorId], references: [id])
authorId     String
//members     User[]  @relation(name: "entity members") // TODO:: v1.2
services     Service[]
expenditures Expenditure[]
createdAt    DateTime      @default(now())
updatedAt    DateTime      @updatedAt
deletedAt    DateTime?
}

model Expenditure {
id        String    @id @unique @default(uuid())
name      String
price     Decimal
entity    Entity    @relation(fields: [entityId], references: [id])
entityId  String
boughtAt  DateTime
createdAt DateTime  @default(now())
updatedAt DateTime  @updatedAt
deletedAt DateTime?
}

model Service {
id          String    @id @unique @default(uuid())
name        String
description String?
initials    String
entity      Entity    @relation(fields: [entityId], references: [id])
entityId    String
price       String
createdAt   DateTime  @default(now())
updatedAt   DateTime  @updatedAt
deletedAt   DateTime?
Order       Order?    @relation(fields: [orderId], references: [id])
orderId     String?
}

model Client {
id        String    @id @unique @default(uuid())
firstName String
lastName  String?
address   Address   @relation(fields: [addressId], references: [id])
addressId String    @unique
car       Car[]
createdAt DateTime  @default(now())
updatedAt DateTime  @updatedAt
deletedAt DateTime?
Order     Order[]
}

model Address {
id         String    @id @unique @default(uuid())
street     String?
box        String?
postalCode String?
locality   String?
country    String?
client     Client?
createdAt  DateTime  @default(now())
updatedAt  DateTime  @updatedAt
deletedAt  DateTime?
}

model Car {
id        String    @id @unique @default(uuid())
merch     String
model     String
year      Int?
color     String?
owner     Client    @relation(fields: [ownerId], references: [id])
ownerId   String
createdAt DateTime  @default(now())
updatedAt DateTime  @updatedAt
deletedAt DateTime?
Order     Order?    @relation(fields: [orderId], references: [id])
orderId   String?
}

model Order {
id          String    @id @unique @default(uuid())
car         Car[]
//carId       String
duration    Decimal
totalPrice  Decimal
client      Client    @relation(fields: [clientId], references: [id])
clientId    String
services    Service[]
perfomedAt  DateTime?
validatedAt DateTime?
createdAt   DateTime  @default(now())
updatedAt   DateTime  @updatedAt
deletedAt   DateTime?
}
```
