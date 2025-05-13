
/**
 * Platform Component Exports
 * 
 * This file provides a unified import path for platform-specific components.
 * In the web version, it exports web components. In the React Native version,
 * it would export native components with the same interface.
 */

// Re-export UI components
export { Button } from '@/components/ui/button';
export { Input } from '@/components/ui/input';
export { Textarea } from '@/components/ui/textarea';
export { Card } from '@/components/ui/card';
export { Label } from '@/components/ui/label';
export { Switch } from '@/components/ui/switch';
export { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
export { Progress } from '@/components/ui/progress';
export { Slider } from '@/components/ui/slider';
export { Separator } from '@/components/ui/separator';

// In React Native, these same exports would point to React Native components
// that implement the same interface but with React Native-specific implementations
