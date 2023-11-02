

    app.factory('AbbrvList', [
        function () {
            // public function
            return function () {
                var abbrvList = ['AB', 'BC', 'ON', 'QC', 'NS'];
                return abbrvList;
            }
        }
    ]);

    app.factory('DefinitionList', [
        function () {
            //public function
            return function () {
                var definitionList = ['Alberta', 'British Columbia', 'Ontario', 'Quebec', 'Nova Scotia'];
                return definitionList;
            }
        }
    ]);

    app.factory('MatchFunc', [
        function () {

            // private function
            function getMatchList() {
                return [{ key: "AB", value: "Alberta" },
                { key: "BC", value: "British Columbia" },
                { key: "ON", value: "Ontario" },
                { key: "QC", value: "Quebec" },
                { key: "NS", value: "Nova Scotia" }];
            }

            // public function
            return function (abbrv, defintion) {

                var matched = false;

                var matchList = getMatchList();

                for (var index = 0; index < matchList.length; ++index) {
                    if (matchList[index].key == abbrv) {
                        if (matchList[index].value == defintion) {
                            matched = true;
                            break;
                        }
                    }
                }
                return matched;
            }
        }
    ]);

