import { Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { CalcularMedia, CalcularMediaTotal } from './contracapaEspcialidade';

export const PdfContracapaEspecialidade = ({ atendimentosPorMes, anoRelatorio, totalPorMes }) => (
    <Page size="A4" style={styles.page}>
        <View style={styles.section}>
            <View style={{ display: "flex",  flexDirection: "row", justifyContent: "space-between", height: "40px" }}>
                <View style={{ width: "50px"}}></View>
                <Text style={{ fontFamily: 'Open Sans', fontSize: 14, fontWeight: 700}}>
                    Tabela de Atendimentos por Mês em {anoRelatorio}
                </Text>
                <Image
                    src={"/logo.png"}
                    style={{height: "40px", width: "40px", marginRight: "10px"}}
                />
            </View>
            <View style={{borderBottomWidth: "1px", borderRightWidth: "1px", marginTop: "10px"}}>
                <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <CelulaEspecialidadeCabecalho texto={"Especialidade"}/>
                    <CelulaCabecalho texto={"JAN"} size={12}/>
                    <CelulaCabecalho texto={"FEV"} size={12}/>
                    <CelulaCabecalho texto={"MAR"} size={12}/>
                    <CelulaCabecalho texto={"ABR"} size={12}/>
                    <CelulaCabecalho texto={"MAI"} size={12}/>
                    <CelulaCabecalho texto={"JUN"} size={12}/>
                    <CelulaCabecalho texto={"JUL"} size={12}/>
                    <CelulaCabecalho texto={"AGO"} size={12}/>
                    <CelulaCabecalho texto={"SET"} size={12}/>
                    <CelulaCabecalho texto={"OUT"} size={12}/>
                    <CelulaCabecalho texto={"NOV"} size={12}/>
                    <CelulaCabecalho texto={"DEZ"} size={12}/>
                    <CelulaCabecalho texto={"Média"} size={11}/>
                </View>
                {atendimentosPorMes.map((especialidade, index) => (
                    <View style={{display: "flex", flexDirection: "row", alignItems: "center"}} key={index}>
                        <CelulaEspecialidadeCorpo texto={especialidade.especialidade}/>
                        <CelulaCorpo texto={especialidade.atendimentoPorMes[0]}/>
                        <CelulaCorpo texto={especialidade.atendimentoPorMes[1]}/>
                        <CelulaCorpo texto={especialidade.atendimentoPorMes[2]}/>
                        <CelulaCorpo texto={especialidade.atendimentoPorMes[3]}/>
                        <CelulaCorpo texto={especialidade.atendimentoPorMes[4]}/>
                        <CelulaCorpo texto={especialidade.atendimentoPorMes[5]}/>
                        <CelulaCorpo texto={especialidade.atendimentoPorMes[6]}/>
                        <CelulaCorpo texto={especialidade.atendimentoPorMes[7]}/>
                        <CelulaCorpo texto={especialidade.atendimentoPorMes[8]}/>
                        <CelulaCorpo texto={especialidade.atendimentoPorMes[9]}/>
                        <CelulaCorpo texto={especialidade.atendimentoPorMes[10]}/>
                        <CelulaCorpo texto={especialidade.atendimentoPorMes[11]}/>
                        <CelulaMedia especialidade={especialidade}/>
                    </View>
                ))}
                <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <CelulaEspecialidadeCorpo texto={"Total"}/>
                    {totalPorMes.map((total, index) => (
                        <CelulaCorpoTotal key={index} texto={total}/>
                    ))}
                    <CelulaCorpoTotal texto={CalcularMediaTotal(totalPorMes)}/>
                </View>
            </View>
        </View>
    </Page>
)

function CelulaEspecialidadeCabecalho({texto}) {
    return (
        <Text style={{   
            width: "200px", 
            height: "20px",
            paddingTop: "4px",
            backgroundColor: "#337B5B", 
            color: "white", 
            fontWeight: 700,
            textAlign: "center",
            borderTopWidth: "1px",
            borderLeftWidth: "1px",
            borderColor: "black",
            fontSize: 12,
            display: "flex", 
            flexDirection: "column",
            justifyContent: "center", 
            alignContent: "center",
            alignItems: "center"
        }}>
            {texto}
        </Text>
    )
}

function CelulaCabecalho({texto, size}) {
    return (
        <Text style={{   
            width: "50px",
            height: "20px",
            paddingTop: "4px",
            backgroundColor: "#337B5B", 
            color: "white", 
            fontWeight: 700,
            textAlign: "center",
            borderTopWidth: "1px",
            borderLeftWidth: "1px",
            borderColor: "black",
            fontSize: size,
            display: "flex", 
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center"
        }}>
            {texto}
        </Text>
    )
}

function CelulaEspecialidadeCorpo({texto}) {
    return (
        <Text style={{   
            width: "200px", 
            height: "20px",
            paddingTop: "4px",
            backgroundColor: "#337B5B", 
            color: "white", 
            fontWeight: 700,
            textAlign: "center",
            borderTopWidth: "1px",
            borderLeftWidth: "1px",
            borderColor: "black",
            fontSize: 9,
            display: "flex", 
            flexDirection: "column",
            justifyContent: "center", 
            alignContent: "center",
            alignItems: "center"
        }}>
            {texto}
        </Text>
    )
}

function CelulaCorpo({texto}) {
    return (
        <Text style={{   
            width: "50px",
            height: "20px",
            paddingTop: "4px",
            textAlign: "center",
            borderTopWidth: "1px",
            borderLeftWidth: "1px",
            borderColor: "black",
            backgroundColor: "white", 
            fontSize: 12,
            display: "flex", 
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center"
        }}>
           {texto}
        </Text>
    )
}

function CelulaCorpoTotal({texto}) {
    return (
        <Text style={{   
            width: "50px",
            height: "20px",
            paddingTop: "4px",
            textAlign: "center",
            borderTopWidth: "1px",
            borderLeftWidth: "1px",
            borderColor: "black",
            backgroundColor: "#337B5B", 
            color: "white",
            fontSize: 10,
            display: "flex", 
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center"
        }}>
           {texto}
        </Text>
    )
}

function CelulaMedia({especialidade}) {
    return (
        <Text style={{   
            width: "50px",
            height: "20px",
            paddingTop: "4px",
            textAlign: "center",
            borderTopWidth: "1px",
            borderLeftWidth: "1px",
            borderColor: "black",
            fontSize: 12,
            display: "flex", 
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center"
        }}>
           {CalcularMedia(especialidade.atendimentoPorMes)}
        </Text>
    )
}

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});