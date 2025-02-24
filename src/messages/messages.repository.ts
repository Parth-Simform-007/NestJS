import { Injectable } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";

@Injectable()
export class MessagesRepository {

    async findOne(id: string) {
        const jsonContent = await readFile("messages.json", "utf8");
        const messages = JSON.parse(jsonContent);
        return messages[id]
    }

    async findAll() {
        const jsonContent = await readFile("messages.json", "utf8");
        const messages = JSON.parse(jsonContent);
        return messages
    }

    async createMessages(content: string) {

        const jsonContent = await readFile("messages.json", "utf8");

        const messages = JSON.parse(jsonContent);
        const randomNumber = Math.floor(Math.random() * 999);
        messages[randomNumber] = { randomNumber, content }
        await writeFile("messages.json", JSON.stringify(messages))

    }
}