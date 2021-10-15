workspace {

  model {
    internalUser = person "Internal User" "User interested in generating a financial report"
    externalUser = person "External User" "User interested in consuming products" "External User"

    softwareSystem = softwareSystem "Financial Report" "System for storing product consumption data and generating financial reports " {
      api = container "API Application" "REST API accessed by the user via HTTP request" "NodeJS" "API Application" {
        productController = component "Product Controller" "Add, update, and query product data "
        reportController = component "Report Controller" "Fetch data for specified report type, generate and send a new report"
      }
      database = container "Database" "Stores product data for use in generating financial reports" "MongoDB" "Database"
    }

    internalUser -> api "HTTP Request: GET"
    api -> internalUser "HTTP Response"
    externalUser -> api "HTTP Request: POST"

    productController -> database "Uses"
    reportController -> database "Uses"
  }

  views {
    systemContext softwareSystem {
      include *
      autolayout lr
    }

    container softwareSystem {
      include *
      autoLayout lr
    }

    component api {
      include *
      autoLayout lr
    }

    # default style
    theme default

    # style overload
    styles {
      element "External User" {
        background #999999
        color #ffffff
      }
      element "API Application" {
        shape WebBrowser
      }
      element "Database" {
        shape Cylinder
    }
  } 
}