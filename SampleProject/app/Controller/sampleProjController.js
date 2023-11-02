

var controllerId = 'sampleProjController';

    app.controller(controllerId, Demo);

    Demo.$inject = ['$scope', '$location', '$anchorScroll',  '$sce', 'AbbrvList', 'DefinitionList', 'MatchFunc'];

    function Demo($scope, $location, $anchorScroll, $sce, abbrvList, definitionList, matchFunc) {
        var matchResult = {},
            success = "ITS A MATCH!",
            failure = "SORRY, NOT A MATCH.",
            noResult = "NO CHEATING, SELECT BOTH THE DROPDOWNS."
            defaultOption = 'Select';

        $scope.History = [];
        $scope.viewHistory = false;

        $scope.abbrvSelected = defaultOption;
        $scope.AbbrvList = [defaultOption];
        $scope.AbbrvList = $scope.AbbrvList.concat(abbrvList());

        $scope.definitionSelected = defaultOption;
        $scope.DefinitionList = [defaultOption];
        $scope.DefinitionList = $scope.DefinitionList.concat(definitionList());

        $scope.DefaultOption = function (ddlName) {
            if (ddlName == 'Abbrv') {
                if ($scope.abbrvSelected == defaultOption) {
                    return "form-control borderRed";
                } else {
                    return "form-control borderGreen";
                }
            }

            if (ddlName == 'Definition') {
                if ($scope.definitionSelected == defaultOption) {
                    return "form-control borderRed";
                } else {
                    return "form-control borderGreen";
                }
            }

            return "form-control";
        }

        $scope.ValidateForm = function () {
            if ($scope.abbrvSelected != defaultOption && $scope.definitionSelected != defaultOption) {
                return true;
            } else {
                matchResult.result = "<span style=\'color: orange; font-size: 20px\'>" + noResult + "</span>";
                $scope.result = $sce.trustAsHtml(matchResult.result);
                return false;
            }
        }

        $scope.SendEmail = function () {
            if ($scope.contactUsEmail == '') {
                return true;
            } else {
                matchResult.result = "<span style=\'color: orange; font-size: 20px\'>" + noResult + "</span>";
                $scope.result = $sce.trustAsHtml(matchResult.result);
                return false;
            }
        }

        $scope.Match = function () {
            var ret = matchFunc($scope.abbrvSelected, $scope.definitionSelected);
            matchResult.abbrv = $scope.abbrvSelected;
            matchResult.value = $scope.definitionSelected;
            if (ret == true) {
                matchResult.result = "<span style=\'color: Chartreuse; font-size: 20px\'>" + success + "</span>";
            } else {
                matchResult.result = "<span style=\'color: red; font-size: 20px\'>" + failure + "</span>";
            }

            $scope.result = $sce.trustAsHtml(matchResult.result);

            $scope.History = [{ abbrv: $scope.abbrvSelected, value: $scope.definitionSelected, result: $sce.trustAsHtml(matchResult.result) }].concat($scope.History);
            $scope.viewHistory = true;
        }

        $scope.gotoAnchor = function (x) {
            var newHash = 'anchor' + x;
            if ($location.hash() !== newHash) {              
                $location.hash('anchor' + x);
            } else {               
                $anchorScroll();
            }
        };

        $scope.resetGame = function () {
            $scope.result = "";
        }

    }


  