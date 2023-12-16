package application;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.concurrent.CompletableFuture;

import org.json.JSONArray;

public class DataUtil {

	//This method connect to server and get the body response into a JsonArray( my list of products)
	@SuppressWarnings("finally")
	public JSONArray getListProducts() {
		
		JSONArray jsonArray = null;
		
		try {
			String url = "http://3.224.45.120:8080/Products/identifiers";
			HttpClient client = HttpClient.newHttpClient();
			
			HttpRequest request = HttpRequest
					.newBuilder()
					.uri(URI.create(url))
					.GET()
					.build();
		CompletableFuture<HttpResponse<String>> response = client.sendAsync(request, HttpResponse.BodyHandlers.ofString());
		
		String jsonResponse = response.thenApply(HttpResponse::body).join();
		
		jsonArray = new JSONArray(jsonResponse);

		} catch (Exception e) {
			System.out.println("erro");
			e.printStackTrace();
			
		}finally {
			return jsonArray;
		}
	}
}
