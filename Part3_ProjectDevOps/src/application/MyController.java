package application;

import java.net.URL;
import java.util.List;
import java.util.ResourceBundle;
import javafx.event.ActionEvent;
import javafx.fxml.Initializable;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.lang.constant.Constable;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpResponse;
import java.net.http.HttpRequest;
import java.util.concurrent.CompletableFuture;

import org.json.JSONArray;
import org.json.JSONObject;


public class MyController implements Initializable {
	
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		// TODO Auto-generated method stub
		//getListProducts();
	}
	
	
	public void getListProducts() {
		try {
			String url = "http://3.224.45.120:8080/Products/identifiers";
			HttpClient client = HttpClient.newHttpClient();
			
			HttpRequest request = HttpRequest
					.newBuilder()
					.uri(URI.create(url))
					.GET()
					.build();
		CompletableFuture<HttpResponse<String>> response = client.sendAsync(request, HttpResponse.BodyHandlers.ofString());
		
		//response.thenApply(HttpResponse::body).thenAccept(System.out::println).join();
		
		String jsonResponse = response.thenApply(HttpResponse::body).join();
		
		//JSONObject jRespJson = new JSONObject(jsonResponse);
		
		JSONArray jsonArray = new JSONArray(jsonResponse);
		
		
		//System.out.println(jsonResponse);
		
		for (int i = 0 ; i < jsonArray.length();i++) {
			
			System.out.println("Product "+i);
			System.out.println(jsonArray.getJSONObject(i).get("Name"));
			
			
		}
		
		} catch (Exception e) {
			System.out.println("erro");
			e.printStackTrace();
		}
	}
	
	public void closebtn(ActionEvent event) { 
		// System.exit(0);
		getListProducts();
	}
		

}
