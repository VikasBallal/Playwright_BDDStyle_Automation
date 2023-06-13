Feature: Product Configurator :: MFE's Validation Tests for Deployment Pipelines

    This feature file is created to have the automated scenarios to be run for the validation of follwoing product configurator owned MFE's
    - Product Configurator MFE
    - Product Configurator Popup MFE
    - Product Configurator ProductHolder MFE
    - Product Configurator Model Recommendations MFE

    @ProductConfigMFE
    Scenario Outline: Validate Product Configurator MFE on DSA
        Given I read the data and navigate to DSA application for a given environment
            | Region   | Browser   |
            | <Region> | <Browser> |
        When I select required BU
        And I go to search product page by selecting a catalog
            | catalog   |
            | <catalog> |
        And I search and add an order code
        And I go to configure page
        Then I should see prduct list loaded
        And I sould see product details loaded
        And I should see SS recommendations section loaded
        When I expand any module
        And I should see module and option Ids displayed

        Examples:
            | Browser | Region  | catalog  | orderCodeToBeAdded |
            | chrome  | AMER_US | usic1f   | Normal_Config_OC   |
            | chrome  | EMEA_UK | ukcbg01f | Normal_Config_OC   |
            | chrome  | APJ_AU  | aurel1f  | Normal_Config_OC   |

    @ProductConfigPopUpMFE
    Scenario Outline: Validate Product Configurator Import Order Code MFE PopUP on DSA
        Given I read the data and navigate to DSA application for a given environment
            | Region   | Browser   |
            | <Region> | <Browser> |
        When I select required BU
        And I go to search product page by selecting a catalog
            | catalog   |
            | <catalog> |
        And I click on more options
        And I click on import order code or chassis Id
        Then I should see import import order code or chassis Id pop up

        Examples:
            | Browser | Region  | catalog  | orderCodeToBeAdded |
            | chrome  | AMER_US | usic1f   | Normal_Config_OC   |
            | chrome  | EMEA_UK | ukcbg01f | Normal_Config_OC   |
            | chrome  | APJ_AU  | aurel1f  | Normal_Config_OC   |

    @ProductConfigPopUpMFE
    Scenario Outline: Validate Product Configurator Add SVP Sku MFE PopUP on DSA
        Given I read the data and navigate to DSA application for a given environment
            | Region   | Browser   |
            | <Region> | <Browser> |
        When I select required BU
        And I go to search product page by selecting a catalog
            | catalog   |
            | <catalog> |
        And I search for an svp sku
        And I click on svp sku add
        Then I should see add svp pop up

        Examples:
            | Browser | Region  | catalog  |
            | chrome  | AMER_US | usic1f   |
            | chrome  | EMEA_UK | ukcbg01f |
            | chrome  | APJ_AU  | aurel1f  |

    @ProductConfigProductHolderMFE
    Scenario Outline: Validate Product Configurator Product Holder MFE PopUP on DSA
        Given I read the data and navigate to DSA application for a given environment
            | Region   | Browser   |
            | <Region> | <Browser> |
        When I select required BU
        And I go to search product page by selecting a catalog
            | catalog   |
            | <catalog> |
        And I search and add an order code
            | orderCodeToBeAdded   |
            | <orderCodeToBeAdded> |
        And I go to configure page
        And I expand any module
        And I go to view quote page

        Examples:
            | Browser | Region  | catalog  | orderCodeToBeAdded |
            | chrome  | AMER_US | usic1f   | Normal_Config_OC   |
            | chrome  | EMEA_UK | ukcbg01f | Normal_Config_OC   |
            | chrome  | APJ_AU  | aurel1f  | Normal_Config_OC   |

    @ProductConfigModelRecomendationsMFE
    Scenario Outline: Validate Product Configurator Model Recomendations MFE on DSA
        Given I read the data and navigate to DSA application for a given environment
            | Region   | Browser   |
            | <Region> | <Browser> |
        When I select required BU
        And I go to search product page by selecting a catalog
            | catalog   |
            | <catalog> |
        And I search and add an order code
            | orderCodeToBeAdded   |
            | <orderCodeToBeAdded> |
        And I go to configure page
        Then I should see model recommendations displayed

        Examples:
            | Browser | Region  | catalog | orderCodeToBeAdded |
            | chrome  | AMER_US | usic1f  | Normal_Config_OC   |
#| chrome  | EMEA_UK | ukcbg01f | Normal_Config_OC   |
#| chrome  | APJ_AU  | aurel1f  | Normal_Config_OC   |
