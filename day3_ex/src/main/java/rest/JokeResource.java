package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dto.ChuckDTO;
import dto.CombinedDTO;
import dto.DadDTO;
import java.io.IOException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import utils.HttpUtils;

/**
 * REST Web Service
 *
 * @author lam
 */
@Path("jokes")
public class JokeResource {
    
    private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();

    @Context
    private UriInfo context;

   
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getJokes() throws IOException {
        String chuckURL = "https://api.chucknorris.io/jokes/random";
        String chuck = HttpUtils.fetchData(chuckURL);
        ChuckDTO chuckDTO = GSON.fromJson(chuck, ChuckDTO.class);
        
        String dadURL = "https://icanhazdadjoke.com";
        String dad = HttpUtils.fetchData(dadURL);
        DadDTO dadDTO = GSON.fromJson(dad, DadDTO.class);
        
        CombinedDTO cDTO = new CombinedDTO(chuckDTO, chuckURL, dadDTO, dadURL);
        
        return GSON.toJson(cDTO);
    }

   
}
