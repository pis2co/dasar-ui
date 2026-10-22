import { describe, expect, it, vi } from 'vitest';
import { DasarToastService } from './dasar-toast.service';

const create = () => new DasarToastService();

describe('DasarToastService', () => {
  it('creates toasts in the entering state with a ref', () => {
    const service = create();
    const ref = service.create({ label: 'One' });
    expect(service.items()).toHaveLength(1);
    expect(service.items()[0].state).toBe('entering');
    expect(ref.id).toBe(service.items()[0].id);
  });

  it('moves to visible and fires onEnter once', () => {
    const service = create();
    const onEnter = vi.fn();
    const ref = service.create({ onEnter });
    service.entered(ref.id);
    service.entered(ref.id);
    expect(service.items()[0].state).toBe('visible');
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onEnter).toHaveBeenCalledWith(ref);
  });

  it('closes with a reason, then removes and fires onLeave', () => {
    const service = create();
    const onClose = vi.fn();
    const onLeave = vi.fn();
    const ref = service.create({ onClose, onLeave });
    service.close(ref.id, 'button');
    service.close(ref.id, 'timeout');
    expect(service.items()[0].state).toBe('leaving');
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledWith(ref, 'button');
    expect(onLeave).not.toHaveBeenCalled();
    service.remove(ref.id);
    expect(service.items()).toHaveLength(0);
    expect(onLeave).toHaveBeenCalledTimes(1);
  });

  it('destroys one specific toast by ref or id', () => {
    const service = create();
    const a = service.create({});
    const b = service.create({});
    service.destroy(a);
    service.remove(a.id);
    expect(service.items().map((item) => item.id)).toEqual([b.id]);
    b.close();
    expect(service.items()[0].state).toBe('leaving');
  });

  it('destroys everything, including queued toasts', () => {
    const service = create();
    service.max.set(1);
    const onClose = vi.fn();
    service.create({ onClose });
    service.create({ onClose });
    service.destroyEverything();
    expect(onClose).toHaveBeenCalledTimes(2);
    expect(onClose.mock.calls.every((call) => call[1] === 'destroy')).toBe(true);
    expect(service.items().map((item) => item.state)).toEqual(['leaving']);
  });

  it('removes a queued toast immediately when it is closed', () => {
    const service = create();
    service.max.set(1);
    service.create({});
    const queued = service.create({});
    expect(service.isRendered(queued.id)).toBe(false);
    queued.close();
    expect(service.items()).toHaveLength(1);
  });

  it('merges options on update', () => {
    const service = create();
    const ref = service.create({ label: 'Old', caption: 'Keep' });
    ref.update({ label: 'New' });
    expect(service.items()[0].options).toMatchObject({ label: 'New', caption: 'Keep' });
  });
});
