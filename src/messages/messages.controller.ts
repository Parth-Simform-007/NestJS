import { Body, Controller, Get, Inject, NotFoundException, Param, Post } from '@nestjs/common';
import { createMessageDTO } from './message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {

    constructor(private readonly messageService: MessagesService) {

    }

    @Get()
    async getAllMessages() {
        const allMessages = await this.messageService.findAll();
        return allMessages
    }

    @Post()
    async createMessages(@Body() body: createMessageDTO) {
        const message = body?.content ?? "";
        const postMessage = await this.messageService.createMessage(message)
        return { message: "Message created!" }
    }

    @Get("/:id")
    async getMessageById(@Param('id') param: any) {
        const response = await this.messageService.findOne(param)
        if (!response) {
           throw new NotFoundException("No Message Found") 
        }
        return response
    }
}
