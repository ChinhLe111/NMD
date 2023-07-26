Feature: Login

  Rule: Happy paths
    Background:
      Given User go to login page

    Scenario: SI-01 Verify that login successfully with valid Email and Password
      When Enter "text" in "Email" with "admin@gmail.com"
      When Enter "text" in "Password" with "123123"
      When Click "Login" button
      Then User look message "Success" popup

  Rule: Bad paths
    Background:
      Given User go to login page

    Scenario: SI-02 Verify that Login unsuccessfully with invalid Email
      When Enter "text" in "Email" with "adminnn@gmail.com"
      When Enter "text" in "Password" with "123123"
      When Click "Login" button
      Then User look message "Tài khoản adminnn@gmail.com không tồn tại trong hệ thống. Vui lòng đăng ký mới." popup

    Scenario: SI-03 Verify that Login unsuccessfully with invalid Password
      When Enter "text" in "Email" with "admin@gmail.com"
      When Enter "text" in "Password" with "12341234"
      When Click "Login" button
      Then User look message "Sai mật khẩu cho tài khoản admin@gmail.com" popup

    Scenario: SI-04 Verify that Login unsuccessfully because no enter Email and Password
      When Click "Login" button
      Then Required message "Email" displayed under "This is a required field!" field
      Then Required message "Password" displayed under "This is a required field!" field

    Scenario: SI-05 Verify that Login unsuccessfully because no enter Email
      When Enter "text" in "Password" with "123123"
      When Click "Login" button
      Then Required message "Email" displayed under "This is a required field!" field

    Scenario: SI-06 Verify that Login unsuccessfully because no enter Password
      When Enter "text" in "Email" with "admin@gmail.com"
      When Click "Login" button
      Then Required message "Password" displayed under "This is a required field!" field
