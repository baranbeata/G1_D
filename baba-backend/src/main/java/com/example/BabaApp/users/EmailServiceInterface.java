package com.example.BabaApp.users;

import org.springframework.mail.MailException;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;


public interface EmailServiceInterface {
    public void sendEmail(SimpleMailMessage email);
}
