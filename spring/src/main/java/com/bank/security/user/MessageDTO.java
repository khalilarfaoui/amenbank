package com.bank.security.user;
public class MessageDTO {

    private String message ;

    public MessageDTO(String message) {
        this.message = message;
    }


    public MessageDTO() {

    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}