@13689380
Feature: This feature enable running scenarios of creating a quote for normal configurable products


	@Regression
	@FY24F_0501_Functional
	Scenario Outline: Validate back to top button visibility and its function
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
		And I scroll the page to the bottom
		Then I should see back to top button displayed

		Examples:
			| Browser | Region  | catalog  | orderCodeToBeAdded |
			| chrome  | AMER_US | usic1f   | Normal_Config_OC   |
			| chrome  | EMEA_UK | ukcbg01f | Normal_Config_OC   |
			| chrome  | APJ_AU  | aurel1f  | Normal_Config_OC   |

	@Regression
	@FY24F_0501_Functional
	@RegressionAlertMsg
	Scenario Outline: Validate incite alert message with incite ID displaying in product config page
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
		Then I should see incite alert message along with incite expression id
		Examples:
			| Browser | Region  | catalog  | orderCodeToBeAdded     |
			#| chrome  | AMER_US | usic1f   | InciteAlertMsgWithIDOC |
			| chrome  | EMEA_UK | ukcbg01f | InciteAlertMsgWithIDOC |
			| chrome  | APJ_AU  | aurel1f  | InciteAlertMsgWithIDOC |