const getDateTemporary = () => {
    var fecha = new Date();

    // Obtener día, mes, año, hora, minutos y segundos
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1; // Se suma 1 ya que los meses van de 0 a 11
    var año = fecha.getFullYear();
    var horas = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();

    // Formatear la fecha y hora
    return dia + '/' + mes + '/' + año + ' ' + horas + ':' + minutos + ':' + segundos;

}

export {
    getDateTemporary
}