#!/usr/bin/env python3
"""Point the site at its public origin.

Usage:
    python tools/set-site-url.py https://xinyuwang668-arch.github.io/personal-site

What it rewrites:
    - og:image / twitter:image in index.html, notes.html and works/*.html
      -> <origin>/assets/og.png
    - https://example.com (or the previous origin) in feed.xml and sitemap.xml
      -> <origin>

The chosen origin is stored in .site-url, so running it again with a new
address migrates the old one instead of leaving a mix behind.
"""

import io
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MARK = os.path.join(ROOT, '.site-url')


def read(path):
    return io.open(path, encoding='utf-8', newline='').read()


def write(path, text):
    io.open(path, 'w', encoding='utf-8', newline='\n').write(text)


def main():
    if len(sys.argv) != 2:
        print(__doc__.strip())
        return 1

    origin = sys.argv[1].strip().rstrip('/')
    if not re.match(r'^https?://[^/]+', origin):
        print('origin must start with http:// or https://')
        return 1

    old = read(MARK).strip() if os.path.exists(MARK) else 'https://example.com'

    pages = ['index.html', 'notes.html']
    pages += ['works/' + n for n in sorted(os.listdir(os.path.join(ROOT, 'works')))
              if n.endswith('.html')]

    pattern = re.compile(r'(<meta\s+(?:property|name)="(?:og:image|twitter:image)"\s+content=")([^"]*)(")')
    changed = 0
    for page in pages:
        path = os.path.join(ROOT, page)
        s = read(path)
        s2, n = pattern.subn(lambda m: m.group(1) + origin + '/assets/og.png' + m.group(3), s)
        if s2 != s:
            write(path, s2)
            changed += 1

    for name in ['feed.xml', 'sitemap.xml']:
        path = os.path.join(ROOT, name)
        s = read(path)
        s2 = s.replace(old, origin).replace('https://example.com', origin)
        if s2 != s:
            write(path, s2)
            changed += 1

    write(MARK, origin + '\n')
    print('origin  :', origin)
    print('previous:', old)
    print('files   :', changed, 'updated')
    print('next    : redeploy, then refresh the social card cache')
    return 0


if __name__ == '__main__':
    sys.exit(main())
