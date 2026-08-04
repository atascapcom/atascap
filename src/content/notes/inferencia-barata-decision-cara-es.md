---
title: "Inferencia Barata, Decisión Cara"
date: 2026-08-03
lang: "es"
description: "Mientras se desploma el coste de la inferencia, el valor no se acumulará en quienes la producen barata, sino en quienes reconstruyan sus decisiones a su alrededor — leído a través de los treinta años de espera de la electrificación."
translationKey: "cheap-inference-expensive-judgment"
cover: "/images/reasoning/ucuz-cikarim-pahali-karar.svg"
coverAlt: "Máquinas de fábrica conectadas por correas a un único eje en el techo — el accionamiento por grupo del siglo XIX"
draft: false
---

En 1899, los motores eléctricos representaban menos del cinco por ciento de la potencia instalada en la industria manufacturera estadounidense. En 1919 esa proporción había llegado al cincuenta y cinco por ciento. En los veinte años intermedios, no ocurrió nada digno de mención en la productividad.

La tecnología estaba ahí. Las fábricas la habían comprado. Los resultados no llegaron.

## La tesis

El coste de la inferencia — que un modelo produzca una salida ante una entrada nueva — seguirá desplomándose. Lo vemos con claridad; los cálculos están más abajo. Pero lo que importa es esto: **el valor no se acumulará en quienes producen inferencia barata, sino en quienes reconstruyan sus procesos de decisión a su alrededor.**

Las empresas más valiosas de los próximos años serán los modelos que razonen con mayor exactitud al elevar la calidad de su inferencia. Y lo extendemos: lo mismo vale para las empresas que usen esos modelos. La medida no es "más tokens" sino "mejor criterio" — y eso es una cuestión de organización, no una partida de compra.

Nos importa la distinción porque, como inversores, lo que miramos no es la tecnología en sí, sino quién la convertirá en beneficio.

## Por qué baja el precio

Epoch AI siguió durante tres años el precio de alcanzar un nivel determinado de rendimiento en seis pruebas distintas. El hallazgo: los precios caen entre 9 y 900 veces al año, con una mediana de 50 veces. El coste de igualar el rendimiento de GPT-4 en preguntas científicas de nivel doctoral se redujo unas 40 veces al año. Más aún, las caídas más rápidas comienzan después de enero de 2024: si se excluyen los datos anteriores, la mediana pasa de 50 a 200 veces. La caída no se está frenando; se está acelerando.

Conviene recoger también la advertencia de la propia Epoch, porque transmitir una cifra así sin ella resultaría engañoso: las caídas más pronunciadas se produjeron en el último año, de modo que no está claro si continuarán.

Esta caída no es magia, es ingeniería. Se resume en tres puntos.

Primero, los modelos se están reduciendo. Arquitecturas que hacen el mismo trabajo con menos parámetros, y métodos de compresión que almacenan los pesos con menor precisión, abaratan directamente el coste de cálculo.

Segundo, cambia la forma de generar. Producir texto es, por naturaleza, un trabajo en serie: el modelo emite los tokens uno a uno, cada cual esperando al anterior. La decodificación especulativa rompe esa cadena — un modelo "borrador", pequeño y rápido, propone varios tokens por adelantado, y el modelo grande los verifica en paralelo, de una sola vez. El trabajo que presentó el método midió una aceleración de dos a tres veces sobre T5-XXL y, algo decisivo, las salidas fueron idénticas. Se gana velocidad sin renunciar a la calidad.

Tercero, y lo menos comentado: la inferencia no es un problema de potencia de cálculo, sino de gestión de memoria. Mientras genera, el modelo mantiene en memoria la representación de los tokens anteriores; cuando se atienden varias peticiones a la vez, cada una necesita su propio espacio. Buena parte de la optimización no viene de "más potencia" sino de usar esa memoria con más inteligencia.

Cuando los tres actúan juntos, aparece una curva conocida en la historia de la tecnología: el coste unitario de un servicio cayendo de forma exponencial durante décadas, sin que caiga su calidad.

El estudio de Nordhaus sobre la iluminación es un ejemplo a largo plazo de esa misma curva. Mil lúmenes-hora de luz costaban 785 dólares en 1800; en 1992 habían bajado a 23 centavos. Una caída del 99,97 por ciento. El énfasis real de Nordhaus era este: como esa caída nunca se reflejó del todo en las estadísticas oficiales, los economistas midieron el crecimiento real por debajo de lo que fue. El valor que crea aquello cuyo precio se desploma suele ser mayor de lo que se mide.

## La ganancia que esperó treinta años

Volvamos ahora a la cifra del principio.

La electricidad parece el salto de productividad más evidente de la historia industrial. No lo fue. El trabajo de Paul David muestra que la electrificación no produjo ninguna ganancia apreciable de productividad durante más de treinta años. La razón no estaba en la tecnología.

La fábrica del siglo XIX se construía con la lógica del "accionamiento por grupo": una sola gran fuente de energía — una rueda hidráulica o una máquina de vapor — movía un largo eje junto al techo, y las máquinas funcionaban desde ese eje mediante correas y poleas. La distribución de la fábrica la dictaba la fuente de energía; las máquinas tenían que estar cerca del eje.

Cuando llegó la electricidad, las fábricas hicieron lo más razonable a su alcance: quitaron la máquina de vapor y pusieron una dinamo en su lugar. El eje se quedó. Las correas se quedaron. La distribución se quedó. Se había extendido un sistema técnico nuevo sobre una capa antigua.

La ruptura llegó en los años veinte y se llamó "accionamiento unitario": un motor para cada máquina. Eso dejó de hacer del motor una pieza de repuesto y cambió el supuesto de diseño de la fábrica. Las máquinas ya podían disponerse no en torno a la fuente de energía, sino **según el flujo del material**. Surgió una planta luminosa, flexible y reorganizable. En los años veinte, la electrificación explicó por sí sola cerca de la mitad del crecimiento de la productividad en la industria.

La conclusión de David es la columna vertebral de esta nota: las tecnologías nuevas exigen un cambio organizativo complementario antes de producir productividad medible. Flujo de trabajo, competencias, práctica de gestión. Comprar el motor era fácil; repensar la fábrica llevó treinta años.

Lo que hacen hoy la mayoría de las empresas es cambiar la máquina de vapor por una dinamo. Se añade un modelo al proceso existente: se resumen informes, se redactan correos, el centro de llamadas se automatiza en parte. El proceso es el mismo proceso. El eje sigue en el techo.

## Inferencia experiencial

Pensar en los efectos de segundo y tercer orden de todo acontecimiento importante es una de las lecciones sobre las que ya hemos escrito.

Donde flaquean los modelos actuales no es en el conocimiento sino en la **profundidad**. Al estudiar una empresa de kits de diagnóstico, la cuestión no es que se venda el aparato, sino que los kits que ese aparato consume generan ingresos recurrentes; a medida que crece la base instalada, el ingreso por kits se agranda como una bola de nieve. Con muchas empresas en posición de monopolio dentro de un sector, los modelos de hoy no saben decir cuál tendrá una ventaja competitiva sostenible, ni por qué. No logran producir lo que significa, en la gestión hotelera, vender habitaciones por anticipado y poner ese efectivo a trabajar en otro sitio durante el invierno, para luego generar nueva entrada de caja con los ingresos de la piscina en verano. Comparando lo que un formador escribió en 2022 con lo que escribió en 2024, no consiguen inferir si su mente ha evolucionado, si sus filtros se han afinado o si está dando vueltas en círculo.

No son carencias de conocimiento, sino de inferencia. El modelo ve el dato y no consigue formar el juicio.

**"El conocimiento y el análisis experienciales son un recurso caro y escaso."** Estudiar hoy una empresa en profundidad exige tiempo, experiencia y acceso; por eso el análisis serio es escaso, y esa escasez es en sí misma una fuente de ventaja.

## Qué está en el precio

El consenso coincide en que se gastará mucho dinero. La expectativa de Wall Street para el gasto de capital de los hyperscalers en 2026 ronda los 527.000 millones de dólares; la propia orientación de las cinco mayores compañías se sitúa entre 635.000 y 690.000 millones, más del doble del nivel de 2024.

Lo interesante es que el consenso se ha quedado corto dos años seguidos. Según una nota de Goldman Sachs, las expectativas a principios de 2024 y de 2025 implicaban un crecimiento del capex de en torno al 20 por ciento; lo realizado superó el 50 por ciento en ambos años.

Así que la idea de que "se gastará mucho dinero en IA" está en el precio. No es ahí donde nos separamos.

Donde nos separamos es en esto: el mercado está poniendo precio al gasto y a la infraestructura, y no está poniendo precio **al cambio en la calidad de las decisiones**. Que una empresa alquile servidores es medible y reportable; que rediseñe sus procesos no es medible y no aparece en una presentación trimestral. Con la electrificación pasó igual: comprar la dinamo se veía en el balance, pasar al accionamiento unitario no. La ganancia vino de lo segundo.

## La versión más sólida del contraargumento

La crítica más dura a esta tesis no es tecnológica sino contable.

En 2025, los ingresos generados por servicios relacionados con la IA fueron de unos 25.000 millones de dólares; en el mismo periodo se gastaron más de 250.000 millones en infraestructura. Es decir, unos diez centavos de ingreso por cada dólar de capex gastado. Según una estimación, los hyperscalers mantienen además compromisos de alquiler de centros de datos firmados pero aún no iniciados por unos 662.000 millones de dólares que, por las normas contables, quedan fuera de balance; esa cifra es mayor que la deuda total dentro de balance de esas mismas compañías.

La objeción es seria y no tiene respuesta fácil. Con el ferrocarril y con la fibra óptica la visión también era correcta; la mayoría de quienes pusieron el capital quebraron, y las ganancias quedaron para los propietarios posteriores.

La respuesta que podemos dar es parcial: la magnitud del gasto no refuta la tesis, golpea **el calendario**. La curva de abaratamiento funciona con independencia del capex — la eficiencia algorítmica, la reducción de los modelos y una mejor gestión de la memoria bajan el coste sin que se construya un solo centro de datos nuevo. Pero esa respuesta no resuelve la pregunta de quién ganará, y nosotros tampoco podemos resolverla. La dejamos abierta.

## La trampa del calendario

La dirección y la fecha son cosas distintas. Somos firmes sobre la dirección y humildes sobre la fecha.

El ejemplo de la electrificación sirve aquí de advertencia. La dirección era correcta en 1899. Se veía mientras la cuota de motores subía del cinco al cincuenta y cinco por ciento. La ganancia llegó veinte o treinta años después. En ese intervalo, la diferencia entre una tesis correcta y un calendario equivocado es, para un inversor, la diferencia entre la ruina y una fortuna.

Llegar pronto es, por sus consecuencias, indistinguible de equivocarse.

## Posicionamiento

Para nosotros esta visión no se traduce en una preferencia por un valor, sino en un conjunto de preguntas. Cuando miramos una empresa ahora también preguntamos: ¿esta dirección está extendiendo la tecnología sobre el proceso existente, o está reconstruyendo el proceso? ¿Hay olas tecnológicas que dejó pasar en el pasado y, de haberlas, por qué las dejó pasar?

La pregunta nos obliga a entender por qué una empresa en posición de monopolio está realmente protegida — un ejercicio que pone a prueba la calidad de nuestra propia inferencia. Una mente lee el mismo dato como "oportunidad", otra como "amenaza", una tercera como "ruido"; la diferencia está en la calidad del modelo interno. Mientras la inferencia de las máquinas se abarata, no mejorar la nuestra sería una pereza extraña. Trabajamos muy en serio sobre la calidad de nuestra propia inferencia.

Todo el mundo intenta construir la mayor inteligencia artificial; lo que más nos importa a nosotros son las compañías de IA centradas en la calidad de la decisión y en elevar la calidad de la inferencia. Al mismo tiempo, seguimos a las empresas que observan esto de cerca y continúan integrando la IA en su actividad mediante desarrollos propios basados en reglas.

Por último, pensamos que la mala calidad de inferencia que provoca en las personas el peso del sentido de pertenencia — y el modo en que frena el bienestar de las comunidades — podría atenuarse, aunque sea en parte, gracias a la inteligencia artificial.

Si el eje sigue en el techo, no nos interesa.
