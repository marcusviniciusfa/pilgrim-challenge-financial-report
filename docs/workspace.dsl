workspace {

  model {
    internalUser = person "Internal User" "User interested in generating a financial report"
    externalUser = person "External User" "User interested in consuming products" "External User"

    softwareSystem = softwareSystem "Financial Report" "System for storing product consumption data and generating financial reports " {
      api = container "API Application" "REST API accessed by the user via HTTP request" "NodeJS" "API Application" {
        reportGenerateController = component "Report Generate Controller"
        reportGenerateEntitie = component "Report Generate Entitie"
        addConsumptionController = component "Add Consumption Controller"
        addConsumptionEntitie = component "Add Consumption Entitie"
      }
      database = container "Database" "Stores product data for use in generating financial reports" "MongoDB" "Database"
    }

    internalUser -> api "HTTP Request: GET"
    api -> internalUser "HTTP Response"
    externalUser -> api "HTTP Request: POST"

    reportGenerateController -> reportGenerateEntitie "Uses"
    reportGenerateEntitie -> database "Read"

    addConsumptionController -> addConsumptionEntitie "Uses"
    addConsumptionEntitie -> database "Write"
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