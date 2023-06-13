@13689380
Feature: This feature enable running scenarios of creating a quote for normal configurable products

	@Regression
	@BVT
	Scenario Outline: Add config item and create a quote
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
		And I patch a customer number
			| Customer   |
			| <Customer> |
		And I create a quote
		Then I should be able to see the quote number generated

		Examples:
			| Browser | Region  | catalog  | orderCodeToBeAdded | Customer       |
			| chrome  | AMER_US | usic1f   | Normal_Config_OC   | CustomerNumber |
			| chrome  | EMEA_UK | ukcbg01f | Normal_Config_OC   | CustomerNumber |
			| chrome  | APJ_AU  | aurel1f  | Normal_Config_OC   | CustomerNumber |
