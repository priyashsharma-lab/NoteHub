package com.notehub.notehub.exception;

import com.notehub.notehub.dto.ErrorResponseDto;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler
{
    private static final Logger log= LoggerFactory.getLogger(GlobalExceptionHandler.class);
    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<ErrorResponseDto> dataAccessException(DataAccessException e, HttpServletRequest request)
    {
        log.error("Data Access Exception;DataBase Error at path: {}",request.getRequestURI(),e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponseDto(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Internal Server Error","An error occurred while accessing the database",request.getRequestURI()));
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponseDto> handleEntityNotFoundException(EntityNotFoundException e,HttpServletRequest request)
    {
        log.warn("Entity not found at path: {}",request.getRequestURI());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponseDto(HttpStatus.NOT_FOUND.value(),"Not Found","Resource Not Found- "+e.getMessage(),request.getRequestURI()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDto> handleMethodArgumentNotValidException(MethodArgumentNotValidException e,HttpServletRequest request)
    {
        List<String> errors=e.getBindingResult().getFieldErrors().stream().map(er->er.getDefaultMessage()).toList();
        log.warn("Method Argument is not valid at path: {}",request.getRequestURI());
        return ResponseEntity.badRequest().body(new ErrorResponseDto(HttpStatus.BAD_REQUEST.value(),"Bad Request","Verification Failed\n Details - \n"+ String.join(";", errors),request.getRequestURI()));
    }
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponseDto> handleConstraintViolation(ConstraintViolationException e, HttpServletRequest request)
    {

        List<String> errors = e.getConstraintViolations().stream().map(cv -> cv.getPropertyPath() + ": " + cv.getMessage()).toList();

        ErrorResponseDto error = new ErrorResponseDto(
                HttpStatus.BAD_REQUEST.value(),
                "Constraint Violation",
                String.join("; ", errors),
                request.getRequestURI()
        );
        log.warn("Constraints Violation at path: {}",request.getRequestURI());

        return ResponseEntity.badRequest().body(error);
    }

    // 2. Catches type conversion errors (e.g. passing "/api/notes/abc" instead of a number)
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponseDto> handleTypeMismatch(
            MethodArgumentTypeMismatchException e,
            HttpServletRequest request) {

        String message = String.format("Parameter '%s' must be of type %s",
                e.getName(), e.getRequiredType().getSimpleName());

        ErrorResponseDto error = new ErrorResponseDto(
                HttpStatus.BAD_REQUEST.value(),
                "Type Mismatch",
                message,
                request.getRequestURI()
        );
        log.warn("Method Argument Type Mismatch at path: {}",request.getRequestURI());
        return ResponseEntity.badRequest().body(error);
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDto> handleGeneralException(Exception e,HttpServletRequest request)
    {
        log.error("Unexpected error occurred",e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponseDto(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Internal Server Error","Something went wrong",request.getRequestURI()));
    }
}
