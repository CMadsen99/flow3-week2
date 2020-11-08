/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dto;

/**
 *
 * @author Acer
 */
public class DadDTO {
    private String id;
    private String joke;
    private String status;

    public DadDTO(String id, String joke, String status) {
        this.id = id;
        this.joke = joke;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public String getJoke() {
        return joke;
    }

    public String getStatus() {
        return status;
    }
    
    
    
}
