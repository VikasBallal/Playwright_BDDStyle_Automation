@14140574
Feature: [ProductConfigurator]-Display Quantity Text box for Non-Tied Modules

	@FY24F_0401_Functional
	@Regression
	Scenario Outline: Validate thin os activation license quantity check box available under this os module
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
		And I expand thin os activation license module
		And I select thin os activation license check box
		And I click on thin os activation license arrow
		Then I should see this os activation license quantity check box availabe

		Examples:
			| Browser | Region  | catalog  | orderCodeToBeAdded |
			| chrome  | EMEA_UK | ukcbg01f | ThisOSOrderCode    |
	#| chrome  | AMER_US | usic1f   | ThisOSOrderCode   |
	#| chrome  | APJ_AU  | aurel1f  | ThisOSOrderCode   |

	@FY24F_0402_Functional
	@Regression
	Scenario Outline: Valiadte potential currency symbol for south africa after patching a USD customer
		Given I read the data and navigate to DSA application for a given environment
			| Region   | Browser   |
			| <Region> | <Browser> |
		When I select required BU
		And I go to search product page
		And I search and add an order code
			| orderCodeToBeAdded   |
			| <orderCodeToBeAdded> |
		And I go to configure page
		And I go to view quote page
		And I patch a customer number
			| Customer   |
			| <Customer> |
		And I click on first product configure btn
		And I expand any module
		Then I should see curreny symbol as dollar

		Examples:
			| Browser | Region  | orderCodeToBeAdded | Customer          |
			| chrome  | EMEA_SA | Normal_Config_OC   | USDCustomerNumber |

	@FY24F_0402_Functional
	@Regression
	Scenario Outline: Valiadte create quote for south africa after patching a customer
		Given I read the data and navigate to DSA application for a given environment
			| Region   | Browser   |
			| <Region> | <Browser> |
		When I select required BU
		And I go to search product page
		And I search and add an order code
			| orderCodeToBeAdded   |
			| <orderCodeToBeAdded> |
		And I go to configure page
		And I go to view quote page
		And I patch a customer number
			| Customer   |
			| <Customer> |
		And I create a quote
		Then I should be able to see the quote number generated

		Examples:
			| Browser | Region  | orderCodeToBeAdded | Customer       |
			| chrome  | EMEA_SA | Normal_Config_OC   | CustomerNumber |