module Part3_ProjectDevOps {
	requires javafx.controls;
	requires javafx.fxml;
	requires java.net.http;
	requires org.json;
	requires javafx.graphics;
	requires javafx.web;
	
	opens application to javafx.graphics, javafx.fxml;
}
