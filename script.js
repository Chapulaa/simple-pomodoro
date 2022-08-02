let acao = document.getElementById('acao')
let pausa = document.getElementById('pausa')
let sessoes = document.getElementById('sessoes')
let segundos

var bell = new Audio('./audios/bell.mp3')
var volta = new Audio('./audios/volta.mp3')
var final = new Audio('./audios/final.mp3')

var lofi = document.getElementById('lofi')
var pause = document.getElementById('pause')
var play = document.getElementById('play')

document.getElementById('timer').style.setProperty('display', 'none', 'important')

function PausarLofi(){
    lofi.pause()
    pause.style.setProperty('display', 'none', 'important')
    play.style.setProperty('display', 'block', 'important')
}

function IniciarLofi(){
    lofi.play()
    pause.style.setProperty('display', 'block', 'important')
    play.style.setProperty('display', 'none', 'important')
}

function Iniciar() {
    if (acao.value <= 0) {
        document.getElementById('mensagem_erro').innerHTML = "Adicione os minutos"
    } else if (pausa.value <= 0) {
        document.getElementById('mensagem_erro').innerHTML = "Adicione a pausa"
    } else if (sessoes.value <= 0) {
        document.getElementById('mensagem_erro').innerHTML = "Adicione as sessoes"
    } else {
        document.getElementById('mensagem_erro').innerHTML = ""
        lofi.play()
        pause.style.setProperty('display', 'block', 'important')

        localStorage.setItem('acao', String(acao.value))
        localStorage.setItem('pausa', String(pausa.value))
        localStorage.setItem('sessoes', String(sessoes.value))

        document.getElementById('config').style.setProperty('display', 'none', 'important')
        document.getElementById('timer').style.setProperty('display', 'block', 'important')

        MomentoAcao()
    }
}

function MomentoAcao() {
    let sessoes_valor = localStorage.getItem('sessoes')

    if (sessoes_valor != 1) {
        document.getElementById('title_sessao').innerHTML = sessoes_valor + ' sessões restantes'
    } else {
        document.getElementById('title_sessao').innerHTML = sessoes_valor + ' sessão restante'
    }

    let title = document.getElementById('title')

    title.innerHTML = "Ação"
    title.style.fontSize = '25pt'
    title.style.fontWeight = 'bold'
    title.style.setProperty('color', '#DEEFCD', 'important')

    min = Number(localStorage.getItem('acao'))

    min = min - 1
    segundos = 59

    document.getElementById('minutes_ok').innerHTML = min
    document.getElementById('seconds_ok').innerHTML = segundos

    var min_interval = setInterval(minTimer, 60000)
    var seg_interval = setInterval(segTimer, 1000)

    function minTimer() {
        min = min - 1
        document.getElementById('minutes_ok').innerHTML = min
    }

    function segTimer() {
        segundos = segundos - 1
        document.getElementById('seconds_ok').innerHTML = segundos

        if (segundos <= 0) {

            if (min <= 0) {
                clearInterval(min_interval)
                clearInterval(seg_interval)

                bell.play()

                MomentoPausa()
            }

            segundos = 60
        }
    }
}

function MomentoPausa() {
    let title = document.getElementById('title')
    title.innerHTML = "Pausa"
    title.style.fontSize = '25pt'
    title.style.fontWeight = 'bold'
    title.style.setProperty('color', '#DEEFCD', 'important')

    ses = Number(localStorage.getItem('sessoes'))
    ses = ses - 1
    localStorage.setItem('sessoes', String(ses))

    if (ses != 1) {
        document.getElementById('title_sessao').innerHTML = ses + ' sessões restantes'
    } else {
        document.getElementById('title_sessao').innerHTML = ses + ' sessão restante'
    }



    min_pausa = Number(localStorage.getItem('pausa'))

    min_pausa = min_pausa - 1
    segundos = 59

    document.getElementById('minutes_ok').innerHTML = min
    document.getElementById('seconds_ok').innerHTML = segundos

    var min_interval = setInterval(minTimer, 60000)
    var seg_interval = setInterval(segTimer, 1000)

    function minTimer() {
        min_pausa = min_pausa - 1
        document.getElementById('minutes_ok').innerHTML = min_pausa
    }

    function segTimer() {
        segundos = segundos - 1
        document.getElementById('seconds_ok').innerHTML = segundos

        if (segundos <= 0) {

            if (min_pausa <= 0) {
                clearInterval(min_interval)
                clearInterval(seg_interval)

                if (ses <= 0) {
                    final.play()
                    localStorage.clear()

                    document.getElementById('minutes_ok').innerHTML = String(0)
                    document.getElementById('seconds_ok').innerHTML = String(0)


                    document.getElementById('config').style.setProperty('display', 'none', 'important')
                    document.getElementById('fim').style.setProperty('display', 'block', 'important')
                }else{
                    volta.play()
                    MomentoAcao()
                }

                volta.play()
            }

            segundos = 60
        }
    }
}