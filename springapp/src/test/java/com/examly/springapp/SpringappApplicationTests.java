package com.examly.springapp;

import java.io.File;
import org.springframework.http.MediaType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = SpringappApplication.class)
@AutoConfigureMockMvc
class SpringappApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    // Test adding a gift through the controller
    @Test
    void test_Add_Gift() throws Exception {
        String giftJson = "{\"name\": \"Rose Shop\",\"giftCategories\": \"Toys\",\"experience\": 5,\"specialization\": \"Custom Crafting\",\"phoneNumber\": \"+919876543210\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/addGift")
                .contentType(MediaType.APPLICATION_JSON)
                .content(giftJson)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
    }

    // Test adding a gift with invalid phone number (exception case)
    @Test
    void test_Add_Gift_With_Invalid_PhoneNumber() throws Exception {
        String giftJson = "{\"name\": \"Daisy Shop\",\"giftCategories\": \"Barbiee Doll\",\"experience\": 3,\"specialization\": \"Uptown\",\"phoneNumber\": \"9876543210\"}";

        mockMvc.perform(MockMvcRequestBuilders.post("/addGift")
                .contentType(MediaType.APPLICATION_JSON)
                .content(giftJson)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest()) // Expecting a bad request for invalid phone number
                .andExpect(jsonPath("$").value("Phone number must start with +91.")); // Adjust the message based on your exception handling
    }

    // Test fetching all gifts from the controller
    @Test
    void test_Get_AllGifts() throws Exception {
        mockMvc.perform(get("/getAllGifts")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andReturn();
    }

    // Verify the controller folder exists
    @Test
    public void test_Controller_Directory_Exists() {
        String directoryPath = "src/main/java/com/examly/springapp/controller";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    // Verify the GiftController class exists
    @Test
    public void test_GiftController_File_Exists() {
        String filePath = "src/main/java/com/examly/springapp/controller/GiftController.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    // Verify the model folder exists
    @Test
    public void test_Model_Directory_Exists() {
        String directoryPath = "src/main/java/com/examly/springapp/model";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    // Verify the Gift model file exists
    @Test
    public void test_Gift_File_Exists() {
        String filePath = "src/main/java/com/examly/springapp/model/Gift.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    // Verify the repository folder exists
    @Test
    public void test_Repository_Folder_Exists() {
        String directoryPath = "src/main/java/com/examly/springapp/repository";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    // Verify the service folder exists
    @Test
    public void test_Service_Folder_Exists() {
        String directoryPath = "src/main/java/com/examly/springapp/service";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    // Verify the GiftService class exists
    @Test
    public void test_GiftService_Class_Exists() {
        checkClassExists("com.examly.springapp.service.GiftService");
    }

    // Verify the Gift model class exists
    @Test
    public void test_GiftModel_Class_Exists() {
        checkClassExists("com.examly.springapp.model.Gift");
    }

    // Check that the Gift model has a 'name' field
    @Test
    public void test_Gift_Model_Has_name_Field() {
        checkFieldExists("com.examly.springapp.model.Gift", "name");
    }

    // Check that the Gift model has a 'giftCategories ' field
    @Test
    public void test_Gift_Model_Has_giftCategories_Field() {
        checkFieldExists("com.examly.springapp.model.Gift", "giftCategories");
    }

    // Check that the Gift model has a 'specialization' field
    @Test
    public void test_Gift_Model_Has_specialization_Field() {
        checkFieldExists("com.examly.springapp.model.Gift", "specialization");
    }

    // Check that the Gift model has a 'phoneNumber' field
    @Test
    public void test_Gift_Model_Has_phoneNumber_Field() {
        checkFieldExists("com.examly.springapp.model.Gift", "phoneNumber");
    }

    // Check that the GiftRepo implements JpaRepository
    @Test
    public void test_GiftRepo_Extends_JpaRepository() {
        checkClassImplementsInterface("com.examly.springapp.repository.GiftRepo",
                "org.springframework.data.jpa.repository.JpaRepository");
    }

    // Verify that CORS configuration class exists
    @Test
    public void test_CorsConfiguration_Class_Exists() {
        checkClassExists("com.examly.springapp.configuration.CorsConfiguration");
    }

    // Verify that CORS configuration has the Configuration annotation
    @Test
    public void test_CorsConfiguration_Has_Configuration_Annotation() {
        checkClassHasAnnotation("com.examly.springapp.configuration.CorsConfiguration",
                "org.springframework.context.annotation.Configuration");
    }

    // Verify that InvalidPhoneNumberException class exists
    @Test
    public void test_InvalidPhoneNumberException_Class_Exists() {
        checkClassExists("com.examly.springapp.exception.InvalidPhoneNumberException");
    }

    // Verify that InvalidPhoneNumberException extends RuntimeException
    @Test
    public void test_InvalidPhoneNumberException_Extends_RuntimeException() {
        try {
            Class<?> clazz = Class.forName("com.examly.springapp.exception.InvalidPhoneNumberException");
            assertTrue(RuntimeException.class.isAssignableFrom(clazz),
                    "InvalidPhoneNumberException should extend RuntimeException");
        } catch (ClassNotFoundException e) {
            fail("InvalidPhoneNumberException class does not exist.");
        }
    }

    // Helper method to check if a class exists
    private void checkClassExists(String className) {
        try {
            Class.forName(className);
        } catch (ClassNotFoundException e) {
            fail("Class " + className + " does not exist.");
        }
    }

    // Helper method to check if a field exists in a class
    private void checkFieldExists(String className, String fieldName) {
        try {
            Class<?> clazz = Class.forName(className);
            clazz.getDeclaredField(fieldName);
        } catch (ClassNotFoundException | NoSuchFieldException e) {
            fail("Field " + fieldName + " in class " + className + " does not exist.");
        }
    }

    // Helper method to check if a class implements an interface
    private void checkClassImplementsInterface(String className, String interfaceName) {
        try {
            Class<?> clazz = Class.forName(className);
            Class<?> interfaceClazz = Class.forName(interfaceName);
            assertTrue(interfaceClazz.isAssignableFrom(clazz));
        } catch (ClassNotFoundException e) {
            fail("Class " + className + " or interface " + interfaceName + " does not exist.");
        }
    }

    // Helper method to check if a class has a specific annotation
    private void checkClassHasAnnotation(String className, String annotationName) {
        try {
            Class<?> clazz = Class.forName(className);
            Class<?> annotationClazz = Class.forName(annotationName);
            assertTrue(clazz.isAnnotationPresent((Class<? extends java.lang.annotation.Annotation>) annotationClazz));
        } catch (ClassNotFoundException e) {
            fail("Class " + className + " or annotation " + annotationName + " does not exist.");
        }
    }
}
