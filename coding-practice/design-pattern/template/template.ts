
abstract class ModelTrainer {
    trainPipeline(dataPath: string) {
        this.loadData(dataPath)
        this.preprocessData();
        this.trainModel()
        this.evaluateModel()
        this.saveModel()
    }

    loadData(path: string) {
        console.log(`[Common] Loading dataset from ${path}`);
    }


    preprocessData() {
        console.log(`[Common] Splitting into train/test and normalizing`);
    }

    saveModel() {
        console.log(`[Common] Saving model to disk as default format`);
    }


    abstract trainModel(): void;
    abstract evaluateModel(): void;
}



class DecisionTreeTrainer extends ModelTrainer {
    trainModel(): void {
        console.log('[DecisionTree] Building decision tree with max_depth=5');
    }

    evaluateModel(): void {
        console.log('[DecisionTree] Building decision tree with max_depth=5');
    }
}


class NeuralNetworkTrainer extends ModelTrainer {
    trainModel(): void {
        console.log('[DecisionTree] Building decision tree with max_depth=5');
    }

    evaluateModel(): void {
        console.log('[DecisionTree] Building decision tree with max_depth=5');
    }

    saveModel(): void {
        console.log("[NeuralNet] Serializing network weights to .h5 file");
    }
}


function main() {
    const nnTrainer: ModelTrainer = new NeuralNetworkTrainer();
    nnTrainer.trainPipeline("data/image");
}

main();

