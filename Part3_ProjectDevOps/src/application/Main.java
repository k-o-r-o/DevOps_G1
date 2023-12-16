package application;

import org.json.JSONArray;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.text.Font;
import javafx.scene.text.Text;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.stage.Modality;
import javafx.stage.Stage;

public class Main extends Application {
	
	Parent root;
	DataUtil dtUtil = new DataUtil();
	
	
	//creating scene
	@Override
	public void start(Stage primaryStage) {
		try {
			root = FXMLLoader.load(getClass().getResource("/project03.fxml"));
			AnchorPane ap = (AnchorPane) root.lookup("#telaP");
			productCard(dtUtil.getListProducts(),ap);
			
			primaryStage.setScene(new Scene(root));
			primaryStage.show();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) {
		launch(args);
	}
	
	//Method to create a list of cards. Where a for loop will interact through a JsonArray, creating individual cards and 
	//put theses on the AnchorPane created before.
	public void productCard(JSONArray jsonArray,AnchorPane ap) {

		double cardWidth=190;
		double cardHeight=240;
		double horizontalSpacing=20;
		double verticalSpacing=20;
		double positionX =horizontalSpacing;
		double positionY =verticalSpacing;
		
		int cardsPerRow=5;
		int currentRow=0;
		
		
		for (int i = 0 ; i < jsonArray.length();i++) {
			
			VBox card = new VBox(5);
			card.setStyle("-fx-border-color: #ccc; -fx-border-radius: 5px; -fx-padding: 10px;");
			
			Text productName = new Text(jsonArray.getJSONObject(i).getString("Name"));
			
		
			//Creating an webView to load productsImages in my server. 
			WebView webView = new WebView();
			WebEngine engine = webView.getEngine();
			engine.load("http://3.224.45.120:8080/Products/images/"+jsonArray.getJSONObject(i).getString("Image"));
			
			String prodName = jsonArray.getJSONObject(i).getString("Name");
			double prodPrice = jsonArray.getJSONObject(i).getDouble("Price");
			String prodColour = jsonArray.getJSONObject(i).getString("Colour");
			String prodImage = jsonArray.getJSONObject(i).getString("Image");
			String prodDescription = jsonArray.getJSONObject(i).getString("Description");
			
			
			Button button = new Button("Details");
			button.setOnAction(e -> showPopUp(prodName,prodPrice,prodColour,prodImage,prodDescription));
			VBox root = new VBox(button);
			
			card.setPrefSize(cardWidth, cardHeight);
			
			
			card.getChildren().addAll(productName,webView,button);
			
			ap.setTopAnchor(card, positionY);
			ap.setLeftAnchor(card, positionX);
			ap.getChildren().add(card);
			
			currentRow++;
			if(currentRow==cardsPerRow) {
				currentRow=0;
				positionY += cardHeight + verticalSpacing;
				positionX = horizontalSpacing;
			}else {
				positionX +=cardWidth+horizontalSpacing;	
			}
			

			System.out.println("Product "+i);
			System.out.println(jsonArray.getJSONObject(i).get("Name"));
			
			
		}
		
		
	}
	
	//This will create and display a pop-up once the user click on the "details" button.
	private void showPopUp(String productName, double price, String productColour,String image, String productDescription) {
		
		Stage popUpStage = new Stage();
		
		popUpStage.initModality(Modality.APPLICATION_MODAL);
		
		VBox popUpLayout = new VBox();
		popUpLayout.setSpacing(10);
		
		Label titleLabel = new Label(productName);
        titleLabel.setFont(Font.font("Arial", 14));
        titleLabel.setStyle("-fx-font-weight: bold");
        
        WebView webView = new WebView();
        webView.setPrefSize(250, 200);
        webView.getStyleClass().add("web-view");
        
		WebEngine engine = webView.getEngine();
		engine.load("http://3.224.45.120:8080/Products/images/"+image);
		
		
		HBox nameLabel = createLabelFormated("Name: ", productName);
		HBox  priceLabel = createLabelFormated("Price: $ ", price+"");
		HBox  colour = createLabelFormated("Colour: ", productColour);
		HBox  descriptionLabel = createLabelFormated("Product Description: ", productDescription);
		
		VBox infoLayout = new VBox(nameLabel, priceLabel, colour, descriptionLabel);
        HBox teaserLayout = new HBox(webView, infoLayout);
		
        VBox mainLayout = new VBox(titleLabel, teaserLayout);
        popUpLayout.getChildren().add(mainLayout);
		
		
		Scene popUpScene = new Scene(popUpLayout, 550, 300);
		
		popUpStage.setTitle("Details");
		
		popUpStage.setScene(popUpScene);
		popUpStage.show();
	}
	
	//Method to create labels that will be used on the pop-up. 
	 private HBox createLabelFormated(String key, String value) {
	        Label label = new Label(key + ": ");
	        label.setStyle("-fx-font-weight: bold");
	        Label valueLabel = new Label(value);
	        HBox hbox = new HBox(label, valueLabel);
	        hbox.setSpacing(5);
	        return hbox;
	    }
}
