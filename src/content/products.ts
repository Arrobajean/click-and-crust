import type { Product } from "@/lib/types";

// Textos de conservación compartidos por varios productos.
const BREAD_STORAGE =
  "Uno de nuestros panes te podrá durar hasta 5 días en buenas condiciones, siempre y cuando lo conserves adecuadamente. Ten en cuenta que los panes pequeños (por ejemplo las barras u hogazas pequeñas) y los que pides rebanados durarán menos que un pan grande sin rebanar. Sigue estos consejos para que tu pan te dure lo máximo posible. Sin congelar: deja tu pan dentro de la bolsa de papel. Ahora ponlo dentro de una bolsa de tela o envuélvelo con uno o dos paños de cocina. También puedes hacerte con una cesta de lino, de esas forradas con tela por dentro. Si pones varios panes dentro (con su bolsa de papel), ahora sólo tendrás que tapar la cesta por arriba con un paño grande. Congelar: deja tu pan dentro de la bolsa de papel. Ahora ponlo dentro de una bolsa de plástico y ya puedes congelarlo. Saca las rebanadas a medida que las necesites y deja que se descongelen a temperatura ambiente. Si quieres hacer tostadas, puedes poner la rebanada congelada directamente al tostador.";

const CROISSANT_STORAGE =
  "Sin congelar, podrás conservar el croissant -como máximo- hasta el desayuno de mañana. Si quieres que aguante más, tendrás que congelarlo. Para conservarlo sin congelar, deja tu croissant en la bolsa de papel y envuélvelo completamente con paño de cocina. Antes de desayunar, precalienta el horno a 130 grados y hornéalo un par de minutos. También puedes ponerlo encima de la rejilla del tostador (dejando un espacio) durante medio minuto, lo suficiente para que se caliente el interior ligeramente. Puedes congelar los croissants para otro día. Para descongelarlos, precalienta el horno a 200º e introduce los croissant (directamente del congelador). Hornea durante 2-3 minutos y retíralos del horno. Deja que se enfríen durante unos 10 minutos, hasta temperatura ambiente.";

const DONUT_STORAGE =
  "Los donuts se conservan mejor en bolsa de plástico, bien cerrada y en un sitio fresco y seco. Al tratarse de una pieza pequeña y con poco grosor, no recomendamos guardarlos así más allá del desayuno del día siguiente. Si quieres alargar la conservación, puedes congelarlos. En ese caso, hazlo en bolsa de plástico y tan pronto como sea posible. Deja que se descongelen a temperatura ambiente o bien dales un golpe de horno para acelerar el proceso (un minuto y medio a 150º)";

export const PRODUCTS: readonly Product[] = [
  {
    slug: "pan-de-payes",
    name: "Pan de Payés",
    category: "panes",
    description:
      "Nuestro pan de payés está elaborado sólo con harina, agua y sal. Levado únicamente con nuestra propia masa madre de trigo, este pan se forma a mano, fermenta durante un día entero y se cuece en horno de piedra. Es un pan de miga esponjosa, pero sin grandes alveolos, por lo que es perfecto para untar tomate o mantequilla. De corteza rústica, bien conservado, te durará 4-5 días en buenas condiciones. Es uno de nuestros panes preferidos para la tostada del desayuno",
    images: ["/images/products/pan-de-payes-1.webp", "/images/products/pan-de-payes-2.webp", "/images/products/pan-de-payes-3.webp", "/images/products/pan-de-payes-4.webp"],
    formats: [
      { id: "pieza", label: "Pieza", priceCents: 499 },
    ],
    cuts: ["Entero", "Rebanado"],
    ingredients: "Harina blanca de trigo ecológico (95%). Harina tostada de maíz (5%) Masa madre de trigo, Sal, Agua.",
    allergens: ["Gluten"],
    storage: BREAD_STORAGE,
    pairing:
      "Este pan pide a gritos una tosta de aguacate con jamón ibérico del bueno. Pero no una tosta cualquiera, sino una TOP TOP. ¿Qué es eso de poner el aguacate sobre el pan así sin más..? Pero si todos sabemos que el aguacate es soso... Toma nota: pela el aguacate y añádele un chorro de AOVE, unas gotas de zumo de lima, una gota de tabasco y un pellizco de sal y pimienta. Ahora ya puedes machacarlo con el tenedor. Ahora que nos hemos currado el aguacate, hagamos lo mismo con el tomate: córtalo a daditos y alíñalo con lo siguiente: AOVE, una poco de mostaza a la antigua en grano y otro poco de Dijon, unas gotas de salsa Worcestershire y un poco de jengibre fresco rallado. Listos para montar la tosta: empezando por el aguacate, seguimos con el tomate y coronamos con jamón, pero del bueno, que no hemos hecho todo esto para acabar poniendo un jamón de batalla:-)",
    related: ["hogaza-integral", "pan-de-espelta", "pan-de-semillas"],
    featured: true,
  },
  {
    slug: "hogaza-integral",
    name: "Hogaza Integral",
    category: "panes",
    description:
      "Nuestro pan integral está elaborado exclusivamente con harina 100% integral. Incluso la masa madre que contiene está elaborada a base de harina integral. Rico en fibra y nutrientes, es un pan de miga muy mullida y con un potente aroma a cereal. Te ayudará a regular el tránsito intestinal y te saciará más deprisa que el pan hecho a base de harina blanca. Si en su día probaste el pan integral y no te gustó, posiblemente no era un integral de verdad. Saludable, de aroma y sabor intenso, se merece que le des una nueva oportunidad!",
    images: ["/images/products/hogaza-integral-1.webp", "/images/products/hogaza-integral-2.webp", "/images/products/hogaza-integral-3.webp", "/images/products/hogaza-integral-4.webp"],
    formats: [
      { id: "pieza", label: "Pieza", priceCents: 535 },
    ],
    cuts: ["Entero", "Rebanado"],
    ingredients: "Harina integral de trigo ecológico. Masa madre de trigo integral (harina integral de trigo ecológico y agua). Sal. Agua.",
    allergens: ["Gluten", "Sésamo"],
    storage: BREAD_STORAGE,
    pairing:
      "Ya que la cosa va de comer sano, haz una tosta de guacamole con sardina ahumada y siéntete bien! Para dar vidilla al guacamole, te sugerimos utilizar tomate de colgar en lugar de tomate en rama o pera; y cebolla morada (remojada previamente en agua) en lugar de cebolla blanca. Para rematar, antes de machacar y mezclar, añade unas gotas de tabasco y un chorro de aceite de oliva virgen extra.",
    related: ["pan-de-payes", "pan-de-centeno"],
  },
  {
    slug: "pan-de-espelta",
    name: "Pan de Espelta",
    category: "panes",
    description:
      "Nuestro pan de espelta está elaborado exclusivamente con harina de espelta. Incluso la masa madre que contiene está elaborada a base de harina (integral) de espelta. En comparación al trigo común, la espelta genera menos intolerancias (por ser un trigo ancestral), se digiere más fácilmente (por tener un gluten débil) y es más nutritivo (ya que aporta lisina, que es un aminoácido esencial no presente en el trigo común). Por todo lo anterior, la espelta es la opción preferida de aquellos que buscan una alternativa al trigo común. Algunas personas (NO celíacas) a las que no les sienta bien el trigo común, encuentran en el espelta su nuevo pan favorito.",
    images: ["/images/products/pan-de-espelta-1.webp", "/images/products/pan-de-espelta-2.webp", "/images/products/pan-de-espelta-3.webp", "/images/products/pan-de-espelta-4.webp"],
    formats: [
      { id: "pieza", label: "Pieza", priceCents: 625 },
    ],
    cuts: ["Entero", "Rebanado"],
    ingredients: "Harina blanca de espelta ecológica. Harina integral de espelta ecológica. Masa madre de espelta integral (harina integral de espelta ecológica y agua). Agua. Sal",
    allergens: ["Gluten"],
    storage: BREAD_STORAGE,
    pairing:
      "Te animas con una tosta de espinacas, gula del norte y salchicha ahumada? Créenos, de veras que está muy buena! Pon en un bol hojas de espinaca fresca. Riega con AOVE, un chorrito generoso de salsa Worcestershire, un poco de mostaza de Dijon y un par de gotas de Tabasco. Mezcla todo. Por otro lado, calienta y corta a trocitos la salchicha. Saltea la gula. Mézclalo todo y monta tu tosta! Acaba con un poco de ralladura de lima.",
    related: ["pan-de-payes", "pan-de-centeno"],
    featured: true,
  },
  {
    slug: "pan-de-centeno",
    name: "Pan de Centeno",
    category: "panes",
    description:
      "Este es un pan 100% centeno y 100% integral, elaborado únicamente con tres ingredientes: harina, agua y sal. A los beneficios de la harina integral, súmale los específicos del centeno: rico en minerales antioxidantes (como selenio y zinc) y ácido fólico. Es un pan de aspecto rústico, con una miga húmeda y tupida. Sabor profundo y saciante. Junto con la espelta, es la opción preferida de las personas que buscan una alternativa al trigo, ya sea por su característico sabor (más contundente) o bien por tener un gluten más débil.",
    images: ["/images/products/pan-de-centeno-1.webp", "/images/products/pan-de-centeno-2.webp", "/images/products/pan-de-centeno-3.webp", "/images/products/pan-de-centeno-4.webp"],
    formats: [
      { id: "pieza", label: "Pieza", priceCents: 595 },
    ],
    cuts: ["Entero", "Rebanado"],
    ingredients: "Harina integral de centeno ecológica. (harina integral de espelta ecológica y agua). Agua. Sal",
    allergens: ["Gluten"],
    storage: BREAD_STORAGE,
    pairing:
      "Qué tal una tosta vegana con este pan? Si te animas, toma nota: pimiento, cebolla y berenjena asada con aceitunas negras de Aragón. Una vez hayas asado y limpiado la carne de las verduras, añade un poco del aceite que ha quedado en la bandeja de asar. Añade también un chorrito de vinagre de vino y un poco de orégano fresco o seco. Acaba con un toque de sal y pimienta. Remueve bien para que todo se mezcle y refrigera para que coja textura y firmeza. Ya estás listo para montar la tosta. No te olvides las aceitunas!",
    related: ["pan-de-payes", "pan-de-trigo-y-centeno"],
    featured: true,
  },
  {
    slug: "pan-de-trigo-y-centeno",
    name: "Pan de Trigo y Centeno",
    category: "panes",
    description:
      "Mezcla al 50% de centeno integral y trigo blanco, ambas harinas de cultivo ecológico. Elaborado únicamente con harina, agua y sal. Este pan te aporta los beneficios de la harina integral, del trigo y del centeno, todo en uno. Pan muy equilibrado en cuanto a sabor, aroma y textura de su miga. Después del Payés, es nuestro pan 'sin cosas' más vendido. Pensamos que es una excelente opción para aquellos que quieren una alternativa al trigo blanco pero no les convence el peculiar sabor del centeno 100% ni tampoco la textura de un pan 100% integral",
    images: ["/images/products/pan-de-trigo-y-centeno-1.webp", "/images/products/pan-de-trigo-y-centeno-2.webp", "/images/products/pan-de-trigo-y-centeno-3.webp", "/images/products/pan-de-trigo-y-centeno-4.webp"],
    formats: [
      { id: "pieza", label: "Pieza", priceCents: 585 },
    ],
    cuts: ["Entero", "Rebanado"],
    ingredients: "Harina integral de centeno ecológico (50%). Harina blanca de trigo ecológico (50%). Masa madre de centeno integral (harina integral de centeno ecológico y agua). Sal. Agua.",
    allergens: ["Gluten"],
    storage: BREAD_STORAGE,
    pairing:
      "Este pan lo reservamos para una tosta infalible: queso crema, salmón ahumado y huevo escalfado. Una vez la tengas montada (en el orden anterior), acábala con un poco de sal Maldón, un chorro de AOVE y un poco de cebollino picado. No te dejes intimidar por el huevo escalfado. En YouTube encontrarás muchos TIPS para hacerlo. A nosotros el que mejor nos funciona en casa es el del hatillo con papel film (durante 3 minutos y atado con una de esas pinzas de Ikea). Si aún y así te da pereza escalfar, puedes freír el huevo sin problemas (eso sí, ensuciarás más...)",
    related: ["pan-de-payes", "pan-de-centeno"],
  },
  {
    slug: "pan-de-semillas",
    name: "Pan de Semillas",
    category: "panes",
    description:
      "Este pan está elaborado con una mezcla propia de harinas de trigo, entre las que destaca la harina tradicional zamorana (70% del total). Para potenciar el sabor, añadimos un poco de harina de centeno integral (5%). Las semillas también potencian el sabor y aportan vitaminas, minerales y abundante fibra. Es un pan de miga esponjosa y potente sabor a cereal. Es el más vendido de entre todos los panes 'Con Cosas' Que elaboramos (pasas y nueces, kalamata, sésamos, etc…). Nuestros clientes lo usan para todo: la tostada del desayuno, para mojar en aceite, para comer solo, para la tosta de la cena…",
    images: ["/images/products/pan-de-semillas-1.webp", "/images/products/pan-de-semillas-2.webp", "/images/products/pan-de-semillas-3.webp", "/images/products/pan-de-semillas-4.webp"],
    formats: [
      { id: "pieza", label: "Pieza", priceCents: 645 },
    ],
    cuts: ["Entero", "Rebanado"],
    ingredients: "Harina integral de centeno ecológico (50%). Harina blanca de trigo ecológico (50%). Masa madre de centeno integral (harina integral de centeno ecológico y agua). Sal. Agua.",
    allergens: ["Gluten"],
    storage: BREAD_STORAGE,
    pairing:
      "Este pan lo reservamos para una tosta infalible: queso crema, salmón ahumado y huevo escalfado. Una vez la tengas montada (en el orden anterior), acábala con un poco de sal Maldón, un chorro de AOVE y un poco de cebollino picado. No te dejes intimidar por el huevo escalfado. En YouTube encontrarás muchos TIPS para hacerlo. A nosotros el que mejor nos funciona en casa es el del hatillo con papel film (durante 3 minutos y atado con una de esas pinzas de Ikea). Si aún y así te da pereza escalfar, puedes freír el huevo sin problemas (eso sí, ensuciarás más...)",
    related: ["pan-de-payes", "pan-de-centeno"],
    featured: true,
  },
  {
    slug: "pan-de-kalamata",
    name: "Pan de Kalamata",
    category: "panes",
    description:
      "La aceituna Kalamata procede de Grecia y tiene un sabor muy especial. Siempre tratamos de usar producto local, pero esta es una de las pocas excepciones que hacemos porque verdaderamente tiene un sabor inigualable. Para rematar, a este pan le añadimos orégano y aceite de oliva virgen extra, de Jaén, claro;-) Si organizas una comida o una cena, con este pan sorprendes y triunfas seguro! Puedes comerlo solo o con aceite de oliva. Casa muy bien con embutido y es perfecto como base para las tostas que quieras hacerte en casa. Es uno de los panes más sabrosos que elaboramos!",
    images: ["/images/products/pan-de-kalamata-1.webp", "/images/products/pan-de-kalamata-2.webp", "/images/products/pan-de-kalamata-3.webp", "/images/products/pan-de-kalamata-4.webp"],
    formats: [
      { id: "pieza", label: "Pieza", priceCents: 530 },
    ],
    cuts: ["Entero", "Rebanado"],
    ingredients: "Harina de centeno integral. Masa madre de trigo. Aceitunas Kalamata. Orégano. Aceite de oliva virgen extra. Agua. Sal",
    allergens: ["Gluten"],
    storage: BREAD_STORAGE,
    pairing:
      "Si eres queser@, te sugerimos una tosta contundente como pocas: queso azul, membrillo y rúcula. Para aligerarla un poco, funde el queso con un chorrito de vino dulce PX y nata líquida hasta que tengas la textura cremosa deseada. Deja que se enfríe y mézclalo con el membrillo cortado a daditos. Acaba con unas gotas de salsa Worcestershire y un par de nueces tostadas. Y que no se te olvide la rúcula fresca!",
    related: ["pan-de-payes", "pan-de-pasas-y-nueces"],
  },
  {
    slug: "pan-de-pasas-y-nueces",
    name: "Pan de Pasas y Nueces",
    category: "panes",
    description:
      "Un clásico que necesita poca presentación. Si esta combinación ha perdurado tanto tiempo, por algo será! Este es uno de nuestros top ventas dentro de la categoría de pan 'con cosas'. Es un pan de corteza fina y miga esponjosa. Las nueces tienen un alto contenido en ácidos grasos Omega 3 de origen vegetal (que reducen el colesterol) y las pasas son ricas en fibra, por lo que facilitan el tránsito intestinal. Este pan, además de estar muy bueno, es doblemente sano!",
    images: ["/images/products/pan-de-pasas-y-nueces-1.webp", "/images/products/pan-de-pasas-y-nueces-2.webp", "/images/products/pan-de-pasas-y-nueces-3.webp", "/images/products/pan-de-pasas-y-nueces-4.webp"],
    formats: [
      { id: "pieza", label: "Pieza", priceCents: 530 },
    ],
    cuts: ["Entero", "Rebanado"],
    ingredients: "Harina de centeno integral. Masa madre de trigo. Pasas. Nueces. Agua. Sal",
    allergens: ["Gluten"],
    storage: BREAD_STORAGE,
    pairing:
      "Hazte una tosta con aguacate, un buen queso cremoso, tomate concassé y un chorro de aceite de oliva virgen extra y te enamorará!",
    related: ["pan-de-payes", "hogaza-integral"],
  },
  {
    slug: "pan-de-tomate",
    name: "Pan de Tomate",
    category: "panes",
    description:
      "Este pan, a base de tomate deshidratado y orégano fresco, te transportará al Mediterráneo inmediatamente. Con una mezcla propia de harinas de trigo (blanco, integral y molido a la piedra), este pan está muy hidratado, por lo que tiene una textura suave que potencia los aromas de todos su ingredientes",
    images: ["/images/products/pan-de-tomate-1.webp", "/images/products/pan-de-tomate-2.webp", "/images/products/pan-de-tomate-3.webp", "/images/products/pan-de-tomate-4.webp"],
    formats: [
      { id: "pieza", label: "Pieza", priceCents: 495 },
    ],
    cuts: ["Entero", "Rebanado"],
    ingredients: "Harinas de trigo (blanca, integral y molida a la piedra). Masa madre de trigo integral (harina integral de trigo ecológico y agua). Tomate deshidratado. Orégano fresco. Agua. Sal",
    allergens: ["Gluten"],
    storage: BREAD_STORAGE,
    pairing:
      "Cuidado: este pan puede desaparecer de la mesa antes de empezar a comer…Escóndelo y hazte una tosta de mozzarella, anchoas y rúcula. Remata con un chorro de aceite de oliva virgen extra y a disfrutar! Si te vienes arriba, saltea una chalota con un poco de ajo y añádelo a la tosta junto con un poco de albahaca fresca. Y si quieres hacerla aún más completa, añade un poco de aguacate.",
    related: ["pan-de-trigo-y-centeno", "hogaza-integral"],
  },
  {
    slug: "pan-de-trigo-con-maiz-y-curcuma",
    name: "Pan de Trigo con Maíz y Cúrcuma",
    category: "panes",
    description:
      "Mezcla de harina blanca de trigo (70%) con harina de maíz (30%), a la que añadimos cúrcuma y pipas de girasol. Para elaborar este pan escaldamos la harina de maíz, lo que hace que esta se caramelice y aumente su sabor. El resultado es un pan de miga abizcochada, corteza fina y un sabor muy peculiar. Las pipas aportan una buena dosis de ácidos grasos y son ricas en minerales, mientras que a la cúrcuma se le atribuyen diversas propiedades medicinales",
    images: ["/images/products/pan-de-trigo-con-maiz-y-curcuma-1.webp", "/images/products/pan-de-trigo-con-maiz-y-curcuma-2.webp", "/images/products/pan-de-trigo-con-maiz-y-curcuma-3.webp", "/images/products/pan-de-trigo-con-maiz-y-curcuma-4.webp"],
    formats: [
      { id: "pieza", label: "Pieza", priceCents: 425 },
    ],
    cuts: ["Entero", "Rebanado"],
    ingredients: "Harina de trigo blanca. Harina de maíz. Masa madre de trigo. Pipas de girasol. Cúrcuma. Agua. Sal",
    allergens: ["Gluten"],
    storage: BREAD_STORAGE,
    pairing:
      "Tosta de pollo campero marinado en soja, aguacate, mango y albahaca. Ahí lo dejamos... No hace falta que te digamos nada más, no?",
    related: ["pan-de-payes", "pan-de-centeno"],
  },
  {
    slug: "viena-molde",
    name: "Pan de Viena de Molde",
    category: "molde",
    description:
      "Un clásico de la panadería en formato molde. Contiene mantequilla y un poco de leche, por lo que su miga es abizcochada y la corteza fina y suave. Es uno de nuestros top ventas en las tiendas físicas. Es el preferido de los niños, pero estamos seguros que muchos adultos lo devoran también!",
    images: ["/images/products/viena-molde-1.webp", "/images/products/viena-molde-2.webp", "/images/products/viena-molde-3.webp", "/images/products/viena-molde-4.webp"],
    formats: [
      { id: "pieza", label: "Pieza", priceCents: 655 },
    ],
    cuts: ["Entero", "Rebanado"],
    ingredients: "Harina blanca de trigo zamorano. Harina de trigo molido a la piedra. Masa madre de trigo. Levadura. Leche. Mantequilla. Sal. Azúcar. Agua",
    allergens: ["Gluten"],
    storage:
      "El pan de Viena puede durar más de 5 días en buenas condiciones (sin rebanar te durará siempre más que si te lo llevas rebanado de la tienda). El pan de Viena tiene mantequilla, por lo que tendrás que tenerlo siempre en bolsa de plástico; tanto si lo congelas como si no. Sin congelar: conserva el pan dentro de una bolsa de plástico y mantenla bien cerrada, en un lugar seco y fresco. Si el calor aprieta, puedes tenerlo en la nevera. Congelar: Para congelarlo, ponlo en una bolsa de plástico. Saca las rebanadas a medida que las necesites y deja que se descongelen a temperatura ambiente. Si quieres hacer tostadas, puedes poner la rebanada congelada directamente al tostador.",
    pairing:
      "Este pan es una magnífica opción para las tostadas del desayuno. También puedes preparar todo tipo de sándwiches con él. Nosotros nos hemos animado con un sándwich de pera, gorgonzola y beicon, y nos ha encantado",
    related: ["hogaza-integral", "pan-de-kalamata"],
  },
  {
    slug: "molde-de-semillas",
    name: "Molde de Semillas",
    category: "molde",
    description:
      "Pan de molde cargadito de semillas, tanto en su interior, como por toda la corteza. Elaborado con harina tradicional zamorana (en un 70%), le añadimos leche y aceite de oliva virgen extra, por lo que su corteza es fina y su miga abizcochada. Otros de los panes que vuelan en las tiendas!",
    images: ["/images/products/molde-de-semillas-1.webp", "/images/products/molde-de-semillas-2.webp", "/images/products/molde-de-semillas-3.webp", "/images/products/molde-de-semillas-4.webp"],
    formats: [
      { id: "pieza", label: "Pieza", priceCents: 485 },
    ],
    cuts: ["Entero", "Rebanado"],
    ingredients: "Harina blanca de trigo zamorano. Harina de trigo molido a la piedra. Masa madre de trigo. Levadura. Leche. Mantequilla. Sal. Azúcar. Agua",
    allergens: ["Gluten", "Lactosa", "Sésamo"],
    storage:
      "El pan de Molde puede durar más de 5 días en buenas condiciones (sin rebanar te durará siempre más que si te lo llevas rebanado de la tienda). El pan de Viena tiene mantequilla, por lo que tendrás que tenerlo siempre en bolsa de plástico; tanto si lo congelas como si no. Sin congelar: conserva el pan dentro de una bolsa de plástico y mantenla bien cerrada, en un lugar seco y fresco. Si el calor aprieta, puedes tenerlo en la nevera. Congelar: Para congelarlo, ponlo en una bolsa de plástico. Saca las rebanadas a medida que las necesites y deja que se descongelen a temperatura ambiente. Si quieres hacer tostadas, puedes poner la rebanada congelada directamente al tostador.",
    pairing:
      "Otra magnífica opción para las tostadas del desayuno. También puedes preparar todo tipo de sándwiches con él. Nosotros nos hemos animado con uno frío de rúcula, mortadela trufada y virutas de parmesano que estaba delicioso!",
    related: ["pan-de-payes", "pan-de-kalamata"],
  },
  {
    slug: "rosquillas-de-anis",
    name: "Rosquillas de Anís",
    category: "bolleria",
    description:
      "Advertimos que estas rosquillas generan adicción. Lo de las rosquillas en nuestras tiendas es una locura. La mayoría de los días, a media mañana, ya se nos han acabado. Tardamos dos días en hacerlas y están formadas a mano, una a una. Ese es el motivo por el que no hay dos iguales. Son super-esponjosas, tiernas y con un aroma maravilloso a mantequilla tostada y anís. Algunos dicen que les recuerdan a los donuts, pero muuucho más delicadas y sin los 25 aditivos que tienen estos...",
    images: ["/images/products/rosquillas-de-anis-1.webp", "/images/products/rosquillas-de-anis-2.webp", "/images/products/rosquillas-de-anis-3.webp", "/images/products/rosquillas-de-anis-4.webp"],
    formats: [
      { id: "250-g-9-11-uds", label: "250 g (9-11 uds)", priceCents: 250 },
      { id: "500-g-18-22-uds", label: "500 g (18-22 uds)", priceCents: 485 },
      { id: "1-kg-36-44-uds", label: "1 kg (36-44 uds)", priceCents: 890 },
    ],
    cuts: [],
    ingredients: "Harina de trigo. Agua. Levadura. Azúcar. Huevo. Sal. Mantequilla. Anis. Aceite de girasol. Licor de anís",
    allergens: ["Gluten", "Lactosa", "Huevo"],
    storage:
      "No sabemos de nadie que haya necesitado conservarlas hasta el día siguiente. Pero si vas a ser tú el primero, ponlas en una bolsa de plástico y déjalas en un sitio fresco y seco. Las rosquillas son pequeñas y no llevan conservantes, así que no van a durar mucho tiempo en buenas condiciones. Si quieres alargar su duración, puedes congelarlas. También en bolsa de plástico y tan pronto como sea posible. Deja que se descongelen a temperatura ambiente o bien dales un golpe de horno para acelerar el proceso (un minuto y medio a 150º).",
    pairing:
      "Otra magnífica opción para las tostadas del desayuno. También puedes preparar todo tipo de sándwiches con él. Nosotros nos hemos animado con uno frío de rúcula, mortadela trufada y virutas de parmesano que estaba delicioso!",
    related: ["hogaza-integral", "pan-de-kalamata"],
  },
  {
    slug: "pan-de-hamburguesa",
    name: "Pan de Hamburguesa",
    category: "molde",
    description:
      "Nuestro pan de hamburguesa está elaborado con mantequilla 100% y huevos camperos. Formamos cada pieza a mano y, antes de hornear, las pintamos con huevo batido y decoramos con semillas de sésamo y amapola. Una unidad de este producto es una bolsa con 4 panecillos. Cada panecillo pesa aproximadamente unos 70g y mide unos 10-11cm de diámetro.",
    images: ["/images/products/pan-de-hamburguesa-1.webp", "/images/products/pan-de-hamburguesa-2.webp"],
    formats: [
      { id: "pieza", label: "Pieza", priceCents: 485 },
    ],
    cuts: ["Entero", "Rebanado"],
    ingredients: "Harina blanca de trigo zamorano. Harina de trigo molido a la piedra. Masa madre de trigo. Levadura. Leche. Mantequilla. Sal. Azúcar. Agua",
    allergens: ["Gluten", "Lactosa", "Sésamo", "Huevo"],
    storage:
      "Los panecillos de hamburguesa contienen mantequilla, así que, como toda elaboración que tenga grasa, hay que conservarlos en bolsa de plástico. Bien cerrada, y en un lugar fresco y seco, deberían durarte unos tres días en buenas condiciones. Si quieres congelarlos, que sea también en bolsa de plástico. Deja que descongelen a temperatura ambiente o bien dales un golpe de calor con el horno precalentado a 180º, durante un par de minutos.",
    pairing:
      "Que el nombre no te condicione; con el pan de hamburguesa puedes hacer todo tipo de sándwiches deliciosos: York y queso, salmón ahumado y aguacate, mortadela trufada y parmesano y mil combinaciones más…",
    related: ["hogaza-integral", "pan-de-kalamata"],
  },
  {
    slug: "croissant-de-mantequilla",
    name: "Croissant de Mantequilla",
    category: "bolleria",
    description:
      "Elaborado, de principio a fin, en nuestro obrador en el centro de Madrid. Nuestros croissants están formados a mano, uno a uno. Están hechos a base de mantequilla belga y con la menor cantidad de azúcar posible (sólo un 5%). Tiene un intenso sabor a mantequilla tostada y una textura suave y crujiente...Vaya, que no es un 'bollo esponjoso' como los que abundan por ahí. Nada que ver con los engendros del supermercado, ni mucho menos con los 'marianicos', que se fabrican a razón de 23mil unidades por hora...",
    images: ["/images/products/croissant-de-mantequilla-1.webp", "/images/products/croissant-de-mantequilla-2.webp", "/images/products/croissant-de-mantequilla-3.webp", "/images/products/croissant-de-mantequilla-4.webp"],
    formats: [
      { id: "unidad", label: "Unidad", priceCents: 250 },
    ],
    cuts: [],
    ingredients: "Harina blanca de trigo zamorano. Harina de trigo molido a la piedra. Masa madre de trigo. Levadura. Leche. Mantequilla. Sal. Azúcar. Agua",
    allergens: ["Gluten", "Lactosa", "Huevo"],
    storage: CROISSANT_STORAGE,
    pairing:
      "Como ya sabes que puedes rellenar el croissant con lo que se te ocurra, te vamos a sugerir una manera distinta de comértelo, especialmente recomendada para niños pequeños. Si cortas el croissant a lo largo, no a lo ancho, te saldrán 3 rebanadas de un dedo de grosor. Estas tienen la forma y textura perfecta para mojar en un buen chocolate a la taza, leche, etc.... Si lo haces con un croissant caliente, el chocolate se fundirá y quedará delicioso. Puedes hacer lo mismo con un croissant frío, pero tendrás que calentar el chocolate antes de mojarlo.",
    related: ["hogaza-integral", "pan-de-kalamata"],
    featured: true,
  },
  {
    slug: "croissant-de-mazapan-y-almendra",
    name: "Croissant de Mazapán y Almendra",
    category: "bolleria",
    description:
      "Sencillo: nuestro croissant de mantequilla relleno con un mazapán elaborado por nosotros y decorado con almendra laminada y un poco de azúcar glas. Está muy bueno. Poco más podemos añadir.",
    images: ["/images/products/croissant-de-mazapan-y-almendra-1.webp", "/images/products/croissant-de-mazapan-y-almendra-2.webp", "/images/products/croissant-de-mazapan-y-almendra-3.webp"],
    formats: [
      { id: "unidad", label: "Unidad", priceCents: 315 },
    ],
    cuts: [],
    ingredients: "Harina de trigo. Agua. Mantequilla. Azúcar. Sal. Levadura fresca. Huevo campero. Mazapán (almendra en polvo, azúcar glas y clara de huevo). Almendra laminada. Azúcar glas",
    allergens: ["Gluten", "Lactosa", "Huevo", "Frutos secos"],
    storage: CROISSANT_STORAGE,
    pairing:
      "Como ya sabes que puedes rellenar el croissant con lo que se te ocurra, te vamos a sugerir una manera distinta de comértelo, especialmente recomendada para niños pequeños. Si cortas el croissant a lo largo, no a lo ancho, te saldrán 3 rebanadas de un dedo de grosor. Estas tienen la forma y textura perfecta para mojar en un buen chocolate a la taza, leche, etc.... Si lo haces con un croissant caliente, el chocolate se fundirá y quedará delicioso. Puedes hacer lo mismo con un croissant frío, pero tendrás que calentar el chocolate antes de mojarlo.",
    related: ["hogaza-integral", "croissant-de-mantequilla"],
  },
  {
    slug: "magdalena-de-espelta",
    name: "Magdalena de Espelta",
    category: "dulces",
    description:
      "Magdalenas elaboradas sólo con harina de espelta procedente de cultivo ecológico. En comparación al trigo común, la espelta genera menos intolerancias (por ser un cereal ancestral), se digiere más fácilmente (por tener un gluten débil) y es más nutritivo (ya que aporta lisina, que es un aminoácido esencial no presente en el trigo común). Qué más se puede pedir a este cereal? Además, las magdalenas están muy ricas!",
    images: ["/images/products/magdalena-de-espelta-1.webp", "/images/products/magdalena-de-espelta-2.webp", "/images/products/magdalena-de-espelta-3.webp", "/images/products/magdalena-de-espelta-4.webp"],
    formats: [
      { id: "paquete-de-6-uds", label: "Paquete de 6 uds", priceCents: 495 },
    ],
    cuts: [],
    ingredients: "Harina blanca de espelta ecológica. Levadura fresca. Azúcar. Mantequilla. Huevo campero. Sal. Leche. Aceite de girasol. Azúcar glas",
    allergens: ["Gluten", "Lactosa", "Huevo"],
    storage:
      "Sin colorantes ni conservantes, aguantarán en buenas condiciones hasta 4 días; siempre y cuando las dejes dentro de la bolsa de plástico, en un lugar seco y fresco. Reutiliza la bolsa de plástico tantas veces como puedas.",
    pairing:
      "Para ser consecuentes con nuestra manera de entender la pastelería y la panadería, no deberíamos recomendarte que cortes una magdalena en dos, le pongas esa crema de avellanas famosa y te la comas. Desde luego que no lo recomendamos… pero si lo haces, no te preocupes, no serás el primero ni el último. Si quieres hacer algo más 'gourmet', prueba a rellenarlas con un poco de crema de queso y mermelada de higo o de naranja amarga. Y si quieres hacer algo más sencillo, simplemente acompáñalas con un buen café o chocolate caliente",
    related: ["hogaza-integral", "croissant-de-mantequilla"],
  },
  {
    slug: "palmera-de-mantequilla",
    name: "Palmera de Mantequilla",
    category: "bolleria",
    description:
      "Nos encantan los clásicos de la bollería y la palmera de mantequilla es una de nuestras señas de identidad. Elaborada artesanalmente con ingredientes ecológicos con harina, mantequilla belga, sal, agua y azúcar. Sin conservantes. Hacemos el hojaldre desde cero y cortamos cada palmera a cuchillo, una a una. Nos gustan con un grosos 'clásico': ni muy grueso, ni ultrafino;-)",
    images: ["/images/products/palmera-de-mantequilla-1.webp", "/images/products/palmera-de-mantequilla-2.webp", "/images/products/palmera-de-mantequilla-3.webp", "/images/products/palmera-de-mantequilla-4.webp"],
    formats: [
      { id: "unidad", label: "Unidad", priceCents: 265 },
      { id: "pack-3-uds", label: "Pack 3 uds", priceCents: 750 },
      { id: "pack-6-uds", label: "Pack 6 uds", priceCents: 1400 },
    ],
    cuts: [],
    ingredients: "Harina de trigo. Agua. Mantequilla. Azúcar. Sal. Levadura fresca. Azúcar",
    allergens: ["Gluten", "Lactosa"],
    storage:
      "Sin congelar, podrás conservar la palmera -como máximo- hasta el desayuno de mañana. Si quieres que aguante más, tendrás que congelarla. Para conservarla sin congelar, deja tu palmera en la bolsa de papel y envuélvela completamente con paño de cocina. Antes de desayunar, precalienta el horno a 150 grados y hornéala un par de minutos. También puedes ponerlo encima de la rejilla del tostador (dejando un espacio) durante medio minuto por cada lado, lo suficiente para que se caliente el interior ligeramente. Puedes congelar las palmeras para otro día. Para descongelarlas, precalienta el horno a 200º e introduce las palmeras (directamente del congelador). Hornea durante 3 minutos y retíralas del horno. Deja que se enfríen durante unos 10 minutos, hasta temperatura ambiente.",
    pairing:
      "Como ya sabes que puedes rellenar la palmera con lo que se te ocurra, te vamos a sugerir una manera distinta de comértela, especialmente recomendada para niños pequeños. Si cortas la palmera a lo largo, no a lo ancho, te saldrán 3 rebanadas de un dedo de grosor. Estas tienen la forma y textura perfecta para mojar en un buen chocolate a la taza, leche, etc.... Si lo haces con una palmera caliente, el chocolate se fundirá y quedará delicioso. Puedes hacer lo mismo con una palmera fría, pero tendrás que calentar el chocolate antes de mojarlo.",
    related: ["hogaza-integral", "palmera-de-chocolate"],
  },
  {
    slug: "palmera-de-chocolate",
    name: "Palmera de Chocolate",
    category: "bolleria",
    description:
      "Palmera de chocolate = palmera 'normal' + baño de chocolate:-) No tendríamos nada más que añadir si no fuese porque el chocolate con el que las bañamos es Valrhona. No te decimos más nada…",
    images: ["/images/products/palmera-de-chocolate-1.webp", "/images/products/palmera-de-chocolate-2.webp"],
    formats: [
      { id: "unidad", label: "Unidad", priceCents: 285 },
      { id: "pack-3-uds", label: "Pack 3 uds", priceCents: 800 },
      { id: "pack-6-uds", label: "Pack 6 uds", priceCents: 1200 },
    ],
    cuts: [],
    ingredients: "Harina de trigo. Agua. Mantequilla. Azúcar. Sal. Levadura fresca. Azúcar. Chocolate.",
    allergens: ["Gluten", "Lactosa"],
    storage:
      "Intenta que no te sobre ninguna palmera de chocolate para el día siguiente. Al contrario que la palmera de mantequilla, la de chocolate no es tan versátil a la hora de regenerarla, ya que no vas a poder hornearla. Si no te la",
    pairing:
      "Como ya sabes que puedes rellenar la palmera con lo que se te ocurra, te vamos a sugerir una manera distinta de comértela, especialmente recomendada para niños pequeños. Si cortas la palmera a lo largo, no a lo ancho, te saldrán 3 rebanadas de un dedo de grosor. Estas tienen la forma y textura perfecta para mojar en un buen chocolate a la taza, leche, etc.... Si lo haces con una palmera caliente, el chocolate se fundirá y quedará delicioso. Puedes hacer lo mismo con una palmera fría, pero tendrás que calentar el chocolate antes de mojarlo.",
    related: ["palmera-de-mantequilla", "croissant-de-mantequilla"],
  },
  {
    slug: "donut-de-azucar",
    name: "Donut de Azúcar",
    category: "bolleria",
    description:
      "En vistas del éxito de nuestras rosquillas, nos hemos tirado a la piscina con los donuts y parece que hemos dado en el clavo: los donuts están poniendo en serios aprietos a los croissants en el ranking del top ventas. Al contrario que en los de la conocida marca industrial, en nuestros donuts de azúcar sólo encontrarás ingredientes naturales. No encontrarás por lo tanto ni aditivos, ni ingredientes indescifrables. El proceso de elaboración de los donuts nos lleva dos días y los formamos y glaseamos a mano, de uno en uno. Ese el motivo por el que no hay dos con la misma forma. Eso sí, están todos igual de ricos! Elaborada artesanalmente con ingredientes ecológicos",
    images: ["/images/products/donut-de-azucar-1.webp", "/images/products/donut-de-azucar-2.webp", "/images/products/donut-de-azucar-3.webp", "/images/products/donut-de-azucar-4.webp"],
    formats: [
      { id: "unidad", label: "Unidad", priceCents: 265 },
      { id: "pack-3-uds", label: "Pack 3 uds", priceCents: 750 },
      { id: "pack-6-uds", label: "Pack 6 uds", priceCents: 1400 },
    ],
    cuts: [],
    ingredients: "Harina de trigo ecológica, leche fresca, huevos camperos, mantequilla, azúcar de caña, levadura natural, aceite de girasol, pizca de sal marina.",
    allergens: ["Gluten", "Lactosa", "Huevo"],
    storage: DONUT_STORAGE,
    pairing:
      "Te recomendaríamos bañar el donut con chocolate, pero eso ya lo hacemos nosotros por ti:-).",
    related: ["palmera-de-mantequilla", "croissant-de-mantequilla"],
  },
  {
    slug: "donut-de-chocolate",
    name: "Donut de Chocolate",
    category: "bolleria",
    description:
      "Donut de chocolate = Donut 'normal' + baño de chocolate:-) No tendríamos nada más que añadir si no fuese porque el chocolate con el que los bañamos es Valrhona. No te decimos más nada…",
    images: ["/images/products/donut-de-chocolate-1.webp", "/images/products/donut-de-chocolate-2.webp"],
    formats: [
      { id: "unidad", label: "Unidad", priceCents: 285 },
      { id: "pack-3-uds", label: "Pack 3 uds", priceCents: 800 },
      { id: "pack-6-uds", label: "Pack 6 uds", priceCents: 1600 },
    ],
    cuts: [],
    ingredients: "Harina de trigo. Agua. Mantequilla. Azúcar. Sal. Levadura fresca. Azúcar. Chocolate. Aceite de Girasol.",
    allergens: ["Gluten", "Lactosa", "Huevo"],
    storage: DONUT_STORAGE,
    pairing:
      "Te recomendaríamos bañar el donut con chocolate, pero eso ya lo hacemos nosotros por ti:-).",
    related: ["palmera-de-mantequilla", "donut-de-azucar"],
  },
  {
    slug: "galleta-avena",
    name: "Galleta de Avena",
    category: "dulces",
    description:
      "Nuestra galleta de avena es el equilibrio perfecto entre lo nutritivo y lo delicioso. Elaborada artesanalmente con ingredientes ecológicos, es crujiente por fuera y tierna por dentro. Endulzada con azúcar de caña y con un ligero toque de canela, es ideal para acompañar el café, el té o disfrutar como snack saludable en cualquier momento del día.",
    images: ["/images/products/galleta-avena-1.webp"],
    formats: [
      { id: "unidad", label: "Unidad", priceCents: 335 },
      { id: "pack-3-uds", label: "Pack 3 uds", priceCents: 950 },
      { id: "pack-6-uds", label: "Pack 6 uds", priceCents: 1800 },
    ],
    cuts: [],
    ingredients: "Copos de avena ecológica, harina de trigo, azúcar de caña integral, mantequilla, huevo, canela, sal marina, levadura.",
    allergens: ["Gluten", "Lactosa", "Huevo"],
    storage:
      "Conservar en lugar fresco y seco. Mantener en un recipiente hermético para preservar su textura. Consumir preferentemente en 3-4 días. Apta para congelación.",
    pairing:
      "Perfecta como tentempié nutritivo o acompañamiento para bebidas calientes. Ideal para desayunos energéticos o para llevar como snack saludable.",
    related: ["palmera-de-mantequilla", "donut-de-azucar"],
  },
  {
    slug: "plumcake-de-limon",
    name: "Plumcake de Limón",
    category: "dulces",
    description:
      "Nuestro plumcake de limón tiene triple dosis limonera: ralladura de limón, zumo de limón y limón confitado. Está elaborado con huevos camperos de Ávila, mantequilla 100% y aceite de oliva. Al estar empapadito con almíbar de limón, queda tierno y jugoso. Tiene un agradable sabor a cítricos, pero sin pasarnos.",
    images: ["/images/products/plumcake-de-limon-1.webp", "/images/products/plumcake-de-limon-2.webp", "/images/products/plumcake-de-limon-3.webp"],
    formats: [
      { id: "unidad", label: "Unidad", priceCents: 795 },
    ],
    cuts: [],
    ingredients: "Huevos camperos. Ralladura de limón. Sal. Azúcar. Nata. Harina de trigo. Impulsor. Mantequilla. Agua. Zumo de limón. Limón confitado",
    allergens: ["Gluten", "Lactosa", "Huevo"],
    storage:
      "Sin colorantes ni conservantes, aguantará en buenas condiciones hasta 6 días; siempre y cuando lo dejes dentro de una bolsa de plástico, en un lugar seco y fresco. Reutiliza la bolsa de plástico tantas veces como puedas.",
    pairing:
      "Mejora si lo combinas con frutos rojos y del bosque (arándanos, fresas, moras, frambuesas…) y le añades unas hojitas de menta.",
    related: ["palmera-de-mantequilla", "donut-de-azucar"],
  },
  {
    slug: "magdalena-espelta",
    name: "Magdalena de Espelta",
    category: "dulces",
    description:
      "Una magdalena suave, esponjosa y con el sabor delicado de la espelta ecológica. Elaborada sin prisas, perfecta para desayunar sin remordimientos. Un clásico que nunca falla.",
    images: ["/images/products/magdalena-espelta-1.webp"],
    formats: [
      { id: "unidad", label: "Unidad", priceCents: 210 },
      { id: "pack-4-uds", label: "Pack 4 uds", priceCents: 780 },
    ],
    cuts: [],
    ingredients: "Harina de espelta ecológica, huevo, azúcar de caña, aceite de oliva virgen extra, leche, levadura, ralladura de limón.",
    allergens: ["Gluten", "Huevo", "Lactosa"],
    storage:
      "Conservar en lugar fresco y seco, dentro de su envoltorio original o en un recipiente hermético. Aguanta esponjosa hasta 2 días. También se puede congelar.",
    pairing:
      "Sabe aún mejor si la calientas 10 segundos al microondas. Ideal con un café recién hecho.",
    related: ["galleta-avena"],
  },
  {
    slug: "magdalena-chocolate",
    name: "Magdalena con Pepitas de Chocolate",
    category: "dulces",
    description:
      "Esponjosa, jugosa y con el toque travieso de las pepitas de chocolate. Una magdalena que alegra cualquier día con solo abrir su envoltorio.",
    images: ["/images/products/magdalena-chocolate-1.webp"],
    formats: [
      { id: "unidad", label: "Unidad", priceCents: 245 },
      { id: "pack-3-uds", label: "Pack 3 uds", priceCents: 690 },
    ],
    cuts: [],
    ingredients: "Harina de trigo ecológica, azúcar de caña, huevo, leche, pepitas de chocolate, aceite de oliva virgen extra, levadura.",
    allergens: ["Gluten", "Huevo", "Lactosa"],
    storage:
      "Guárdala en un bote hermético o su envoltorio. Se mantiene tierna hasta 2 días. Congelable sin perder textura.",
    pairing:
      "Saca una sonrisa mojándola en leche o café. Si la calientas unos segundos, el chocolate se derrite. Y tú también.",
    related: ["magdalena-espelta", "galleta-chocolate"],
  },
  {
    slug: "galleta-chocolate",
    name: "Galleta de Chocolate",
    category: "dulces",
    description:
      "Una galleta de las que desaparecen sin darte cuenta. Con trozos de chocolate ecológico y una textura perfecta: crujiente por fuera y tierna por dentro.",
    images: ["/images/products/galleta-chocolate-1.webp"],
    formats: [
      { id: "unidad", label: "Unidad", priceCents: 310 },
      { id: "pack-3-uds", label: "Pack 3 uds", priceCents: 890 },
      { id: "pack-6-uds", label: "Pack 6 uds", priceCents: 1700 },
    ],
    cuts: [],
    ingredients: "Harina de trigo ecológica, azúcar de caña, mantequilla, huevo, trozos de chocolate negro, levadura, sal marina.",
    allergens: ["Gluten", "Lactosa", "Huevo"],
    storage:
      "Conservar en lugar fresco y seco. Idealmente en un tarro cerrado. Se mantiene crujiente hasta 4 días. También puedes congelarla.",
    pairing:
      "Sírvela con un vaso de leche fría o un té especiado. Si te atreves, ponle helado encima.",
    related: ["galleta-avena", "magdalena-chocolate"],
  },
  {
    slug: "bizcocho-cacao",
    name: "Bizcocho de Cacao",
    category: "dulces",
    description:
      "Nuestro bizcocho de cacao es denso, húmedo y honesto. Sabe a cacao de verdad y está hecho para los que aman lo clásico sin aditivos. Una rebanada te hace feliz, dos te reconcilian con la semana.",
    images: ["/images/products/bizcocho-cacao-1.webp"],
    formats: [
      { id: "rebanada", label: "Rebanada", priceCents: 380 },
      { id: "tarta-entera-6-8-porciones", label: "Tarta entera (6-8 porciones)", priceCents: 2100 },
    ],
    cuts: [],
    ingredients: "Harina integral ecológica, cacao puro, azúcar de caña, huevo, aceite de girasol alto oleico, yogur natural, levadura, esencia de vainilla.",
    allergens: ["Gluten", "Huevo", "Lactosa"],
    storage:
      "Guarda el bizcocho en un recipiente cerrado a temperatura ambiente. Se mantiene jugoso 2-3 días. Puedes congelarlo en porciones envueltas individualmente.",
    pairing:
      "Ideal como desayuno o merienda. Va genial con leche vegetal o un espresso corto. Si eres goloso, prueba a añadirle un toque de mermelada.",
    related: ["galleta-chocolate", "magdalena-chocolate"],
  },
  {
    slug: "hojaldre-pistacho",
    name: "Hojaldre de Pistacho",
    category: "bolleria",
    description:
      "Lo confesamos: esta receta la hicimos para no tirar los recortes que deja la masa del croissant una vez la cortamos a cuchillo. Así que se nos ocurrió hacer una pasta casera a base de pistacho natural y aceite de oliva. Pensamos que combinaría bien con nuestra crema pastelera (que, como no puede ser de otro modo, hacemos nosotros, desde cero) y con frambuesas naturales. Pues resulta que del invento de los recortes ha salido lo que posiblemente sea una de las mejores elaboraciones de hojaldre que hacemos a día de hoy...que cosas tiene la pastelería oiga...",
    images: ["/images/products/hojaldre-pistacho-1.webp", "/images/products/hojaldre-pistacho-2.webp", "/images/products/hojaldre-pistacho-3.webp", "/images/products/hojaldre-pistacho-4.webp"],
    formats: [
      { id: "unidad", label: "Unidad", priceCents: 360 },
      { id: "pack-2-uds", label: "Pack 2 uds", priceCents: 690 },
    ],
    cuts: [],
    ingredients: "Harina de trigo ecológica, mantequilla, azúcar de caña, Crema pastelera (leche, nata, azúcar, almidón de maíz, yema de huevo, sal y vainilla), pistachos tostados, crema vegetal de pistacho, sal marina.",
    allergens: ["Gluten", "Lactosa", "Frutos de cáscara"],
    storage:
      "Puedes conservar la bollería para otra ocasión. Si es para el desayuno día siguiente, déjala en el sobre de papel o caja de cartón en la que venía y envuelve todo ello con uno o dos paños de cocina. Antes de desayunar, hornea las piezas a 150 grados durante un par de minutos. También puedes congelarla (en bolsa de plástico). Para descongelarla, precalienta el horno a 200º e introduce las piezas de bollería (directamente del congelador). Hornea durante 2-3 minutos y retira del horno. Deja que se enfríe durante unos 10 minutos, hasta temperatura ambiente.",
    pairing:
      "Si tienes una cena en casa y no te quieres complicar con el postre, añade a cada hojaldre una bola de helado y tira millas. Dejarás el listón esfuerzo/placer muy alto y a ver quien es el cocinillas que te supera en la siguiente ocasión. Además, di que lo has hecho tú. Es más, di que has hecho croissants y que con los recortes se te ha ocurrido improvisar esta tartaleta que has sacado; que tenías ahí en el armario unos pocos pistacho y unas frambuesas y, mira tú por donde, ha combinado todo genial y ha salido un postre de lujo. No te olvides de ponerle un poco de azúcar glas por encima y a disfrutar.",
    related: ["galleta-avena", "bizcocho-cacao"],
    featured: true,
  },
];
