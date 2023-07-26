Feature: Medical_procedure
  Rule: Happy paths

    Background: MP_01 Verify when create Medical procedure successfully
      Given User go to login page
      When Enter "text" in "Email" with "admin@gmail.com"
      When Enter "text" in "Password" with "123123"
      When Click "Login" button
      Then User look message "Success" popup
      When Click "QUẢN LÝ DANH MỤC" menu
      When Click "Loại thủ thuật" sub menu to "/medical-procedure"
