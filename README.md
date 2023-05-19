
# Purrfect-store

## [Ve a la aplicación](https://purrfect-shop.adaptable.app/)))



## Description

Segundo proyecto del curso de desarrollo web de Ironhack hecho por Lorena Lario y Cecilia Torreira. Consiste en una pequeña tienda de productos como videojuegos, merchandising, decoración, etc con temática geek.
 

**Acciones que el usuario puede realizar -** 

- **404** - El usuario recibe un mensaje de error si no encuentra la ruta a la que quiere acceder.
- **500** - El usuario recibirá un mensaje de error dándole a entender que es culpa del equipo encargado de la aplicacion
- **Inicioo** - El usuario siempre tiene acceso a la página de inicio desde cualquier otro lugar de la web.
- **Resgistro de usuario** - El usuario puede crear una cuenta para acceder a las funcionalidades de la web.
- **Inicio de sesión** - Una vez el usuario crea su cuenta puede iniciar sesión y tener una sesión activa.
- **Cerrar sesión** - El usuario puede cerrar su sesión.
- **Perfil de usuario e historial de compras** - El usuario una vez inicie sesión puede acceder a su perfil privado y ver su historial de compras realizadas.
- **Editar, eliminar y añadir productos** - En el caso de usuarios con rol de administrador podrán modificar libremente el contenido de la web, así como ver el historial de compras realizadas en ella.
- **Buscar productos por categoría y nombre** - Todos los usuarios pueden usar el buscador para acceder a una lista de productos en base a lo que quieran buscar o por sus categorías.


## BONUS Y EXTRAS

**Pendiente** Tenemos algunos bonuses que nos gustaría implementar pero querríamos pensar bien sobre ellos antes.

## Tecnologías usadas:

- HTML
- CSS
- Javascript
- Node
- Express
- Handlebars
- Sessions & Cookies


## RUTAS
**RUTAS DE INICIO** 
- GET / 
  - Renderiza la página de inicio
  
  
**RUTAS DE AUTENTIFICACIÓN** 

- GET /auth/signup
  - Renderiza el formulario para crear una cuenta.

- POST /auth/signup
  - Crea un nuevo usuario y lo añade a la base de datos

- GET /auth/login
  - Renderiza el formulario para iniciar sesión.
  
- POST /auth/login
  - El usuario introduce sus credenciales y tiene acceso a su cuenta.
  - body:
    - username
    - password


## Modelos



User model
 
```
    username: 
      type: String,
      trim: true,
      required: false,
      unique: true
    
    email: 
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    
    password: 
      type: String,
      required: true
    
    role: 
      type: String,
      enum: ["admin", "user"],
      default: "user"
    
    purchasesMade: [ 
      type: Schema.Types.ObjectId,
      ref: "Purchase"
     ]
  
```

Purchase model

```
 buyerName: 
      type: String,
      required: true
   
    shippingAddress: 
    type: String,
    required: true
    
    purchasedProduct: 
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    
    paymentMethod: 
    type: String,
    enum: ["Paypal", "Tarjeta", "Contrarreembolso"],
    required: true
    
  
    timestamps: true
``` 
Product model

```
 name: 
      type: String,
      required: true,
      unique: true
    
    price: 
      type: String,
      required: true,
    
    category: 
    type: String,
    enum: ["figura", "cómic", "videojuegos", "peluche", "decoración", "miscelánea"],
    required: true,
    
    description: 
      type: String,
      required: true,
    
    productImage: String,
  
 
    timestamps: true
```

## Links

## Colaboradores

[Developer 1 name]([www.github-url.com](https://github.com/CeciliaTorreira))

[Developer 2 name]([www.github-url.com](https://github.com/LorenaLario))

### Project

[Repository Link](https://github.com/CeciliaTorreira/store-app))
[Slides_Link](https://acrobat.adobe.com/id/urn:aaid:sc:EU:58d5a45d-c974-45e7-acd6-7e5390062c00)

[Deploy Link][www.your-deploy-url-here.com](https://purrfect-shop.adaptable.app/))

### Trello

[Link to your trello board](www.your-trello-url-here.com)

### Slides

[Slides Link](www.your-slides-url-here.com)
