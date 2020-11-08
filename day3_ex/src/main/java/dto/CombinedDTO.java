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
public class CombinedDTO {
    private String joke1;
    private String reference1;
    private String joke2;
    private String reference2;

    public CombinedDTO(ChuckDTO chuckDTO, String reference1, DadDTO dadDTO, String reference2) {
        this.joke1 = chuckDTO.getValue();
        this.reference1 = reference1;
        this.joke2 = dadDTO.getJoke();
        this.reference2 = reference2;
    }

    public String getJoke1() {
        return joke1;
    }

    public void setJoke1(String joke1) {
        this.joke1 = joke1;
    }

    public String getReference1() {
        return reference1;
    }

    public void setReference1(String reference1) {
        this.reference1 = reference1;
    }

    public String getJoke2() {
        return joke2;
    }

    public void setJoke2(String joke2) {
        this.joke2 = joke2;
    }

    public String getReference2() {
        return reference2;
    }

    public void setReference2(String reference2) {
        this.reference2 = reference2;
    }
    
    
    
}
