Feature: Navigation

  Rule: Happy paths

    Background:
      Given User go to login page
      When Enter "text" in "Email" with "admin@gmail.com"
      When Enter "text" in "Password" with "123123"
      When Click "Login" button
      Then User look message "Success" popup
      When Click "SUPERADMIN" menu
      When Click "Phân quyền điều hướng" sub menu to "/navigation"
      When Click "Add new" button
      When Enter "text" in "Navigation name" with "_RANDOM_"
      When Enter "text" in "Navigation code" with "_RANDOM_"
      When Enter "text" in "Link" with "/_RANDOM_"
      When Enter "number" in "Order" with "_RANDOM_"
      When Click switch "Active" to be activated
      When Enter "text" in "Icon" with "las la-folder-minus"
      When Click tree select "Parent navigation" with "SUPERADMIN"
      When Click assign list "Order Side, Farmer Side"
      When Click "Save" button

    Scenario: DH_01 Verify when Create menu successfully
      Then User look message "Success" popup
      When Click on the previously created "Navigation name" tree to delete

    Scenario: DH_02 Verify when Edit menu successfully
      When Click on the previously created "Navigation name" tree to edit
      When Enter "text" in "Navigation name" with "_RANDOM_"
      When Enter "text" in "Navigation code" with "_RANDOM_"
      When Enter "text" in "Link" with "/_RANDOM_"
      When Enter "number" in "Order" with "_RANDOM_"
      When Click "Save" button
      Then User look message "Success" popup
      When Click on the previously created "Navigation name" tree to delete

    Scenario: DH_03 Verify when Delete menu successfully
      When Click on the previously created "Navigation name" tree to delete
      Then User look message "Success" popup
