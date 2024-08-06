package com.openclassrooms.yourcaryourway.controller;

import com.openclassrooms.yourcaryourway.model.ChatMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class ChatMessageController {
    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/{roomId}")
    public ChatMessage chat(ChatMessage chatMessage, @DestinationVariable String roomId) {

        log.info("Message sent to room: {}, messageContent: {}", roomId, chatMessage.getMessageContent());
        return ChatMessage.builder()
                .messageContent(chatMessage.getMessageContent())
                .user(chatMessage.getUser())
                .build();
    }
}
