var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ModelTrainer = /** @class */ (function () {
    function ModelTrainer() {
    }
    ModelTrainer.prototype.trainPipeline = function (dataPath) {
        this.loadData(dataPath);
        this.preprocessData();
        this.trainModel();
        this.evaluateModel();
        this.saveModel();
    };
    ModelTrainer.prototype.loadData = function (path) {
        console.log("[Common] Loading dataset from ".concat(path));
    };
    ModelTrainer.prototype.preprocessData = function () {
        console.log("[Common] Splitting into train/test and normalizing");
    };
    ModelTrainer.prototype.saveModel = function () {
        console.log("[Common] Saving model to disk as default format");
    };
    return ModelTrainer;
}());
var DecisionTreeTrainer = /** @class */ (function (_super) {
    __extends(DecisionTreeTrainer, _super);
    function DecisionTreeTrainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DecisionTreeTrainer.prototype.trainModel = function () {
        console.log('[DecisionTree] Building decision tree with max_depth=5');
    };
    DecisionTreeTrainer.prototype.evaluateModel = function () {
        console.log('[DecisionTree] Building decision tree with max_depth=5');
    };
    return DecisionTreeTrainer;
}(ModelTrainer));
var NeuralNetworkTrainer = /** @class */ (function (_super) {
    __extends(NeuralNetworkTrainer, _super);
    function NeuralNetworkTrainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NeuralNetworkTrainer.prototype.trainModel = function () {
        console.log('[DecisionTree] Building decision tree with max_depth=5');
    };
    NeuralNetworkTrainer.prototype.evaluateModel = function () {
        console.log('[DecisionTree] Building decision tree with max_depth=5');
    };
    NeuralNetworkTrainer.prototype.saveModel = function () {
        console.log("[NeuralNet] Serializing network weights to .h5 file");
    };
    return NeuralNetworkTrainer;
}(ModelTrainer));
function main() {
    var nnTrainer = new NeuralNetworkTrainer();
    nnTrainer.trainPipeline("data/image");
}
main();
