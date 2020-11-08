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
public class ChuckDTO {
    private String id;
    private String url;
    private String value;

    public ChuckDTO(String id, String url, String value) {
        this.id = id;
        this.url = url;
        this.value = value;
    }

    public String getId() {
        return id;
    }

    public String getUrl() {
        return url;
    }

    public String getValue() {
        return value;
    }
    
    
    
}
