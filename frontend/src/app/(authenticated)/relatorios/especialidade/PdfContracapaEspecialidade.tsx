import { Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

export const PdfContracapaEspecialidade = ({ atendimentosPorMes, anoRelatorio }) => (
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
                    <CelulaCabecalho texto={"JAN"}/>
                    <CelulaCabecalho texto={"FEV"}/>
                    <CelulaCabecalho texto={"MAR"}/>
                    <CelulaCabecalho texto={"ABR"}/>
                    <CelulaCabecalho texto={"MAI"}/>
                    <CelulaCabecalho texto={"JUN"}/>
                    <CelulaCabecalho texto={"JUL"}/>
                    <CelulaCabecalho texto={"AGO"}/>
                    <CelulaCabecalho texto={"SET"}/>
                    <CelulaCabecalho texto={"OUT"}/>
                    <CelulaCabecalho texto={"NOV"}/>
                    <CelulaCabecalho texto={"DEZ"}/>
                </View>
                {atendimentosPorMes.map((especialidade, index) => (
                    <View style={{display: "flex", flexDirection: "row", alignItems: "center"}} key={index}>
                        <CelulaEspecialidadeCorpo especialidade={especialidade}/>
                        <CelulaCorpo especialidade={especialidade} mes={0}/>
                        <CelulaCorpo especialidade={especialidade} mes={1}/>
                        <CelulaCorpo especialidade={especialidade} mes={2}/>
                        <CelulaCorpo especialidade={especialidade} mes={3}/>
                        <CelulaCorpo especialidade={especialidade} mes={4}/>
                        <CelulaCorpo especialidade={especialidade} mes={5}/>
                        <CelulaCorpo especialidade={especialidade} mes={6}/>
                        <CelulaCorpo especialidade={especialidade} mes={7}/>
                        <CelulaCorpo especialidade={especialidade} mes={8}/>
                        <CelulaCorpo especialidade={especialidade} mes={9}/>
                        <CelulaCorpo especialidade={especialidade} mes={10}/>
                        <CelulaCorpo especialidade={especialidade} mes={11}/>
                    </View>
                ))}
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

function CelulaCabecalho({texto}) {
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

function CelulaEspecialidadeCorpo({especialidade}) {
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
            {especialidade.especialidade}
        </Text>
    )
}

function CelulaCorpo({especialidade, mes}) {
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
           {especialidade.atendimentoPorMes[mes]}
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