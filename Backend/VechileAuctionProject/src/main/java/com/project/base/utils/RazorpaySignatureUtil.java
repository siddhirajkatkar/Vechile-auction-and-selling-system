package com.project.base.utils;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class RazorpaySignatureUtil {

    private static final String HMAC_SHA256 = "HmacSHA256";

    public static boolean verify(
            String orderId,
            String paymentId,
            String razorpaySignature,
            String secret) {

        try {
            String payload = orderId + "|" + paymentId;

            Mac mac = Mac.getInstance(HMAC_SHA256);
            SecretKeySpec secretKey =
                    new SecretKeySpec(secret.getBytes(), HMAC_SHA256);
            mac.init(secretKey);

            byte[] hash = mac.doFinal(payload.getBytes());
            String generatedSignature =
                    Base64.getEncoder().encodeToString(hash);

            return generatedSignature.equals(razorpaySignature);
        } catch (Exception e) {
            return false;
        }
    }
}
