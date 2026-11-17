package com.notehub.notehub.exception;

public class InvalidNoteStateException extends RuntimeException
{
    public InvalidNoteStateException(String msg)
    {
        super(msg);
    }
}
