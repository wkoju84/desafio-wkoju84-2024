class RecintosZoo {
    constructor() {
        // Definindo os recintos existentes
        this.recintos = [
            { numero: 1, bioma: ['savana'], tamanhoTotal: 10, animais: [{ especie: 'macaco', quantidade: 3 }] },
            { numero: 2, bioma: ['floresta'], tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animais: [{ especie: 'gazela', quantidade: 1 }] },
            { numero: 4, bioma: ['rio'], tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: ['savana'], tamanhoTotal: 9, animais: [{ especie: 'leao', quantidade: 1 }] }
        ];

        // Definindo as informações sobre os animais
        this.animaisInfo = {
            LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
        };
    }

    analisaRecintos(animal, quantidade) {
        // Validação de entrada
        if (!this.animaisInfo[animal]) {
            return { erro: "Animal inválido" };
        }
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const infoAnimal = this.animaisInfo[animal];
        const tamanhoTotalNecessario = infoAnimal.tamanho * quantidade;

        let recintosViaveis = [];

        // Verificar todos os recintos
        this.recintos.forEach((recinto) => {
            
            if (!infoAnimal.biomas.some(b => recinto.bioma.includes(b))) {
                return; 
            }

            // Calcula o espaço ocupado pelos animais existentes
            let espacoOcupado = recinto.animais.reduce((acumulado, animal) => {
                return acumulado + this.animaisInfo[animal.especie.toUpperCase()].tamanho * animal.quantidade;
            }, 0);

            // Adiciona espaço extra se há mais de uma espécie no recinto
            const maisDeUmaEspecie = recinto.animais.length > 0;
            if (maisDeUmaEspecie) {
                espacoOcupado += 1; 
            }

            // Calcula o espaço livre
            const espacoLivre = recinto.tamanhoTotal - espacoOcupado;

            // Carnívoros diferentes não podem dividir o mesmo recinto
            if (infoAnimal.carnivoro && recinto.animais.length > 0) {
                const especiePresente = recinto.animais[0].especie.toUpperCase();
                if (this.animaisInfo[especiePresente].carnivoro && especiePresente !== animal) {
                    return; 
                }
            }
            if (animal === 'HIPOPOTAMO' && recinto.animais.length > 0 && recinto.bioma.length === 1) {
                return; 
            }
            if (animal === 'MACACO' && recinto.animais.length === 0) {
                return; 
            }

            // Verifica se o espaço é suficiente para os novos animais
            if (espacoLivre >= tamanhoTotalNecessario) {
                recintosViaveis.push({
                    numero: recinto.numero,
                    espacoLivre: espacoLivre - tamanhoTotalNecessario,
                    tamanhoTotal: recinto.tamanhoTotal
                });
            }
        });

        // Retorna os recintos viáveis ordenados ou uma mensagem de erro
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        // Formata os recintos viáveis no formato especificado
        recintosViaveis = recintosViaveis.sort((a, b) => a.numero - b.numero).map(r => {
            return `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.tamanhoTotal})`;
        });

        return { recintosViaveis };
    }
}

const zoo = new RecintosZoo();
console.log(zoo.analisaRecintos('MACACO', 2));
console.log(zoo.analisaRecintos('UNICORNIO', 1));




export { RecintosZoo as RecintosZoo };



