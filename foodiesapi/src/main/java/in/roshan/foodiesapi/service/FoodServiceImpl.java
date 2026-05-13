package in.roshan.foodiesapi.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import in.roshan.foodiesapi.entity.FoodEntity;
import in.roshan.foodiesapi.io.FoodRequest;
import in.roshan.foodiesapi.io.FoodResponse;
import in.roshan.foodiesapi.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FoodServiceImpl implements FoodService{

    @Autowired
    private Cloudinary cloudinary;
    @Autowired
    private FoodRepository foodRepository;

    @Value("${cloudinary.folder:foodies}")
    private String folder;

    @Override
    public String uploadFile(MultipartFile file) {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "folder", folder,
                            "resource_type", "image"
                    )
            );
            Object secureUrl = uploadResult.get("secure_url");
            if (secureUrl == null) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "File upload failed");
            }
            return secureUrl.toString();
        } catch (IOException ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An error occured while uploading the file");
        }
    }

    @Override
    public FoodResponse addFood(FoodRequest request, MultipartFile file) {
        FoodEntity newFoodEntity = convertToEntity(request);
        String imageUrl = uploadFile(file);
        newFoodEntity.setImageUrl(imageUrl);
        newFoodEntity = foodRepository.save(newFoodEntity);
        return convertToResponse(newFoodEntity);
    }

    @Override
    public List<FoodResponse> readFoods() {
        List<FoodEntity> databaseEntries = foodRepository.findAll();
        return databaseEntries.stream().map(object -> convertToResponse(object)).collect(Collectors.toList());
    }

    @Override
    public FoodResponse readFood(String id) {
        FoodEntity existingFood = foodRepository.findById(id).orElseThrow(() -> new RuntimeException("Food not found for the id:"+id));
        return convertToResponse(existingFood);
    }

    @Override
    public boolean deleteFile(String filename) {
        try {
            cloudinary.uploader().destroy(filename, ObjectUtils.emptyMap());
            return true;
        } catch (IOException ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An error occured while deleting the file");
        }
    }

    @Override
    public void deleteFood(String id) {
        FoodResponse response = readFood(id);
        String imageUrl = response.getImageUrl();
        String publicId = extractPublicId(imageUrl);
        boolean isFileDelete = deleteFile(publicId);
        if (isFileDelete) {
            foodRepository.deleteById(response.getId());
        }
    }

    /**
     * Extracts the Cloudinary public_id from a secure_url.
     * Example URL: https://res.cloudinary.com/<cloud>/image/upload/v1234567890/foodies/abc123.jpg
     * Returns: foodies/abc123
     */
    private String extractPublicId(String imageUrl) {
        if (imageUrl == null || imageUrl.isEmpty()) {
            return "";
        }
        int uploadIdx = imageUrl.indexOf("/upload/");
        if (uploadIdx == -1) {
            return "";
        }
        String afterUpload = imageUrl.substring(uploadIdx + "/upload/".length());
        // strip optional version segment like v1234567890/
        if (afterUpload.startsWith("v") && afterUpload.indexOf('/') > 0) {
            String maybeVersion = afterUpload.substring(1, afterUpload.indexOf('/'));
            if (maybeVersion.matches("\\d+")) {
                afterUpload = afterUpload.substring(afterUpload.indexOf('/') + 1);
            }
        }
        // strip extension
        int dotIdx = afterUpload.lastIndexOf('.');
        if (dotIdx > 0) {
            afterUpload = afterUpload.substring(0, dotIdx);
        }
        return afterUpload;
    }

    private FoodEntity convertToEntity(FoodRequest request) {
        return FoodEntity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .category(request.getCategory())
                .price(request.getPrice())
                .build();

    }

    private FoodResponse convertToResponse(FoodEntity entity) {
        return FoodResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .category(entity.getCategory())
                .price(entity.getPrice())
                .imageUrl(entity.getImageUrl())
                .build();
    }
}
