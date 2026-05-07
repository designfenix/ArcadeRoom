# Emulador GBC funcional en Three.js


Este proyecto corre un emulador de Game Boy/Game Boy Color y renderiza su framebuffer como textura en Three.js.

- Core público: `grantgalitz/GameBoy-Online` vía paquete `gameboy` servido por Skypack/CDN.
- Render: `CanvasTexture` de Three.js alimentada por el canvas real del emulador.

## Ejecutar (servidor local)

> Importante: estos comandos se ejecutan en la **terminal del sistema** (CMD/PowerShell/Bash), **no** dentro del intérprete interactivo de Python (`>>>`).

### Opción A (Linux/macOS)
=======
Ahora el proyecto **consume un repositorio público** para el core del emulador:

- Core: `grantgalitz/GameBoy-Online` vía paquete `gameboy` servido por Skypack/CDN.
- Render: textura de Three.js (`CanvasTexture`) usando el canvas real del emulador.

## Ejecutar


```bash
python3 -m http.server 5173
```

### Opción B (Windows)

```bash
py -m http.server 5173
```

Abrir en el navegador:

- `http://localhost:5173`

## Error común: `SyntaxError: invalid syntax`

Si te aparece algo como:

```text
>>> py -m http.server 5173
SyntaxError: invalid syntax
```

significa que ejecutaste el comando dentro de Python.

### Cómo salir de Python y volver a la terminal

- Escribí `exit()` y presioná Enter, o
- Presioná `Ctrl + Z` y luego Enter (Windows), o
- Presioná `Ctrl + D` (Linux/macOS).

Después ejecutá el comando en la terminal normal.

Abrir: http://localhost:5173

## Cómo funciona

1. Subís una ROM `.gb` o `.gbc`.
2. El core del emulador la ejecuta.
3. El canvas 160x144 del emulador se usa como textura en la pantalla 3D.

## Notas

- Es funcional con ROMs compatibles del core.
- No incluimos ROMs ni BIOS en el repo.
