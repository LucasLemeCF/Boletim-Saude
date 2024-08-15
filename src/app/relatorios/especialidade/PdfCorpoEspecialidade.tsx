/* eslint-disable jsx-a11y/alt-text */
import { Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

export const PdfCorpoEspecialidade = ({ img }) => (
  <Page size="A4" style={styles.page}>
    <View style={styles.section}>
      <View style={{ display: "flex",  flexDirection: "row", justifyContent: "space-between", height: "40px" }}>
        <View style={{ width: "50px"}}></View>
        <Text style={{ fontFamily: 'Open Sans', fontSize: 14, fontWeight: 700}}>
          Teste
        </Text>
        <Image
          source={"/logo.png"}
          style={{height: "40px", width: "40px", marginRight: "10px"}}
        />
      </View>
      <Image
        source={img[0]}
        style={{ height: "322", width: "552", marginTop: "16px" }}
      />
      <View style={{ display: "flex",  flexDirection: "column", justifyContent: "space-between", height: "30px", marginTop: "32px"}}>
        <Text style={{ textAlign: "center", fontFamily: 'Open Sans', fontSize: 12, fontWeight: 700}}>
          Teste 2
        </Text>
      </View>
      <Image
        source={img[1]}
        style={{height: "322", width: "552" }}
      />
    </View>
  </Page>
)

function somarAtendimentos(especialidades) {
  let soma = 0;
  
  especialidades.map(especialidade => {
    especialidade.resultadosMensais[0].resultadosDiarios.map(resultadosDiario => {
      soma += resultadosDiario.atendimentos;
    });
  });

  return soma;
}

Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 }
  ]
})

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