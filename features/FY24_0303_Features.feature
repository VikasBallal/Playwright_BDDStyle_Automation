@13689380
Feature: Product Configurator :: Hide the DPA column in the Configure screen for APJ & EMEA

	ESCRIPTION: Currently, the DPA column is displayed in the Product Configurator screen if user is expanding the Modules
	Ask is to not show the DPA column as it is not relevant for GOP

	@STORY_13986530
	@FY24F_0303_Functional
	@Regression
	Scenario Outline: Validate DPA Column under module of an order code is displayed for amer not displayed for emea and apj regions
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
		Then I should validate is DPA column displayed
			| IsDPADisplayed   |
			| <IsDPADisplayed> |
		Examples:
			| Browser | Region  | catalog  | orderCodeToBeAdded |
			| chrome  | AMER_US | usic1f   | Normal_Config_OC   |
			| chrome  | EMEA_UK | ukcbg01f | Normal_Config_OC   |
			| chrome  | APJ_AU  | aurel1f  | Normal_Config_OC   |

	@STORY_13986534
	@FY24F_0303_Functional
	@Regression
	Scenario Outline: User with no view margin acess validate margin column under any module of an order code is hidden all regions
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
		Then I should see only margin icons displayed

		Examples:
			| Browser | Region  | catalog  | orderCodeToBeAdded |
			| chrome  | AMER_US | usic1f   | Normal_Config_OC   |
			| chrome  | EMEA_UK | ukcbg01f | Normal_Config_OC   |
			| chrome  | APJ_AU  | aurel1f  | Normal_Config_OC   |

	@STORY_13986534
	@FY24F_0303_Functional
	@Regression
	Scenario Outline: User with view margin acess validate margin column under any module of an order code is hidden all regions
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
		Then I should see margin icons with values displayed

		Examples:
			| Browser | Region  | catalog  | orderCodeToBeAdded |
			| chrome  | AMER_US | usic1f   | Normal_Config_OC   |
			| chrome  | EMEA_UK | ukcbg01f | Normal_Config_OC   |
			| chrome  | APJ_AU  | aurel1f  | Normal_Config_OC   |

	@STORY_13986539
	@FY24F_0303_Functional
	@Regression
	Scenario Outline: Validate brand Id level alert messages are displaying on the configurator page
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
		Then I should see brand Id alert message displayed displayed

		Examples:
			| Browser | Region  | catalog | orderCodeToBeAdded |
			| chrome  | AMER_US | usic1f  | BrandIDAlertOC     |
#| chrome  | EMEA_UK | ukcbg01f | BrandIDAlertOC     |
#| chrome  | APJ_AU  | aurel1f  | BrandIDAlertOC     |