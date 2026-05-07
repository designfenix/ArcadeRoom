# Emulador GBC funcional en Three.js

Ahora el proyecto **consume un repositorio público** para el core del emulador:

- Core: `grantgalitz/GameBoy-Online` vía paquete `gameboy` servido por Skypack/CDN.
- Render: textura de Three.js (`CanvasTexture`) usando el canvas real del emulador.

## Ejecutar

```bash
python3 -m http.server 5173
```

Abrir: http://localhost:5173

## Cómo funciona

1. Subís una ROM `.gb` o `.gbc`.
2. El core del emulador la ejecuta.
3. El canvas 160x144 del emulador se usa como textura en la pantalla 3D.

## Notas

- Es funcional con ROMs compatibles del core.
- No incluimos ROMs ni BIOS en el repo.
